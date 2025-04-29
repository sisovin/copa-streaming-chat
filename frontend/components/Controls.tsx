import React from 'react';

interface ControlsProps {
  onMute: () => void;
  onUnmute: () => void;
  onStartVideo: () => void;
  onStopVideo: () => void;
  isMuted: boolean;
  isVideoOn: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onMute,
  onUnmute,
  onStartVideo,
  onStopVideo,
  isMuted,
  isVideoOn,
}) => {
  return (
    <div className="controls">
      <button onClick={isMuted ? onUnmute : onMute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <button onClick={isVideoOn ? onStopVideo : onStartVideo}>
        {isVideoOn ? 'Stop Video' : 'Start Video'}
      </button>
    </div>
  );
};

export default Controls;
