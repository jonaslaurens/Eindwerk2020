import io from 'socket.io-client';

export default class socketClient {
  socket;

  connect(host) {
    this.socket = io.connect(host);
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', (error) => reject(error));
    });
  }
}
