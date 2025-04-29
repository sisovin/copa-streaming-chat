import React, { createContext, useState, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useWebRTC } from '../hooks/useWebRTC';
import { useSocket } from '../hooks/useSocket';
import { useMediaStream } from '../hooks/useMediaStream';

interface VideoCallContextProps {
  socket: Socket | null;
  stream: MediaStream | null;
  peers: any[];
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
}

const VideoCallContext = createContext<VideoCallContextProps | undefined>(undefined);

export const VideoCallProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<any[]>([]);

  const { getMediaStream } = useMediaStream();
  const { connectSocket, disconnectSocket } = useSocket();
  const { handleJoinRoom, handleLeaveRoom } = useWebRTC(socket, stream, setPeers);

  useEffect(() => {
    const init = async () => {
      const mediaStream = await getMediaStream();
      setStream(mediaStream);

      const socketConnection = connectSocket();
      setSocket(socketConnection);
    };

    init();

    return () => {
      disconnectSocket();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const joinRoom = (roomId: string) => {
    if (socket) {
      handleJoinRoom(roomId);
    }
  };

  const leaveRoom = () => {
    if (socket) {
      handleLeaveRoom();
    }
  };

  return (
    <VideoCallContext.Provider value={{ socket, stream, peers, joinRoom, leaveRoom }}>
      {children}
    </VideoCallContext.Provider>
  );
};

export const useVideoCall = () => {
  const context = useContext(VideoCallContext);
  if (context === undefined) {
    throw new Error('useVideoCall must be used within a VideoCallProvider');
  }
  return context;
};
