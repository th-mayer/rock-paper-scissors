import { io } from 'socket.io-client'

const Socket = () => {
  const socket = io('ws://localhost:8000/', {})

  socket.on('connect', () => {
    console.log('User connected');
  })
}
export default Socket;
