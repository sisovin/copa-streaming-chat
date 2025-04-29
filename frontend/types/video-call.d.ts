export interface VideoCall {
  id: string;
  participants: Participant[];
  stream: MediaStream;
}

export interface Participant {
  id: string;
  name: string;
  stream: MediaStream;
}
