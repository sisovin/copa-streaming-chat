import React from 'react';

interface Participant {
  id: string;
  name: string;
  stream: MediaStream;
}

interface ParticipantsProps {
  participants: Participant[];
}

const Participants: React.FC<ParticipantsProps> = ({ participants }) => {
  return (
    <div className="participants">
      {participants.map((participant) => (
        <div key={participant.id} className="participant">
          <h3>{participant.name}</h3>
          <video
            ref={(video) => {
              if (video) {
                video.srcObject = participant.stream;
              }
            }}
            autoPlay
            playsInline
          />
        </div>
      ))}
    </div>
  );
};

export default Participants;
