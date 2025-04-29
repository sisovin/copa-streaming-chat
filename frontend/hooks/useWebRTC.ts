import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Peer {
  id: string;
  stream: MediaStream;
}

export const useWebRTC = (socket: Socket | null, stream: MediaStream | null, setPeers: (peers: Peer[]) => void) => {
  const [peers, updatePeers] = useState<Peer[]>([]);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});

  useEffect(() => {
    if (!socket || !stream) return;

    const handleNewPeer = async (peerId: string) => {
      const peerConnection = new RTCPeerConnection();
      peerConnections.current[peerId] = peerConnection;

      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('ice-candidate', { to: peerId, candidate: event.candidate });
        }
      };

      peerConnection.ontrack = event => {
        const remoteStream = event.streams[0];
        updatePeers(prevPeers => [...prevPeers, { id: peerId, stream: remoteStream }]);
      };

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', { to: peerId, offer });
    };

    const handleOffer = async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      const peerConnection = new RTCPeerConnection();
      peerConnections.current[from] = peerConnection;

      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('ice-candidate', { to: from, candidate: event.candidate });
        }
      };

      peerConnection.ontrack = event => {
        const remoteStream = event.streams[0];
        updatePeers(prevPeers => [...prevPeers, { id: from, stream: remoteStream }]);
      };

      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', { to: from, answer });
    };

    const handleAnswer = async ({ from, answer }: { from: string; answer: RTCSessionDescriptionInit }) => {
      const peerConnection = peerConnections.current[from];
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    };

    const handleIceCandidate = async ({ from, candidate }: { from: string; candidate: RTCIceCandidateInit }) => {
      const peerConnection = peerConnections.current[from];
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    };

    socket.on('new-peer', handleNewPeer);
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleIceCandidate);

    return () => {
      socket.off('new-peer', handleNewPeer);
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleIceCandidate);
    };
  }, [socket, stream]);

  const handleJoinRoom = (roomId: string) => {
    if (socket) {
      socket.emit('join-room', { roomId });
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit('leave-room');
      Object.values(peerConnections.current).forEach(peerConnection => peerConnection.close());
      peerConnections.current = {};
      setPeers([]);
    }
  };

  return { handleJoinRoom, handleLeaveRoom };
};
