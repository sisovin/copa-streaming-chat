const peerConfig = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    {
      urls: 'turn:turn.example.com',
      username: 'user',
      credential: 'password',
    },
  ],
};

export default peerConfig;
