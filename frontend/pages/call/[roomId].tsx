import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { VideoCallProvider, useVideoCall } from '../../contexts/VideoCallContext';
import VideoPlayer from '../../components/VideoPlayer';
import Controls from '../../components/Controls';
import Participants from '../../components/Participants';
import Chat from '../../components/Chat';

const CallRoom: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { stream, peers, joinRoom, leaveRoom } = useVideoCall();

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId as string);
    }

    return () => {
      leaveRoom();
    };
  }, [roomId]);

  return (
    <div className="call-room">
      <div className="video-section">
        {stream && <VideoPlayer stream={stream} />}
        <Participants participants={peers} />
      </div>
      <Controls
        onMute={() => {}}
        onUnmute={() => {}}
        onStartVideo={() => {}}
        onStopVideo={() => {}}
        isMuted={false}
        isVideoOn={true}
      />
      <Chat />
    </div>
  );
};

const CallRoomPage: React.FC = () => (
  <VideoCallProvider>
    <CallRoom />
  </VideoCallProvider>
);

export default CallRoomPage;
