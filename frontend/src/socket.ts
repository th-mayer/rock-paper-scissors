import { io, Socket } from 'socket.io-client';

const socket: Socket = io(import.meta.env.VITE_API_URL);

export default socket;
