import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketConnection = io('http://localhost:3000');
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const connectSocket = () => {
    if (!socket) {
      const socketConnection = io('http://localhost:3000');
      setSocket(socketConnection);
      return socketConnection;
    }
    return socket;
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return { socket, connectSocket, disconnectSocket };
};
