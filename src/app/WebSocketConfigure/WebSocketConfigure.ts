export class WebSocketConfigure {
  socket!: WebSocket;

  messages: string[] = [];

  constructor() {}

  handleSocketError(error: any) {
    console.error('Erro no websocket:', error);
  }

  handleSocketClose() {
    console.log('Websocket fechado.');
  }

  handleSocketOpen() {
    console.log('Websocket conectado.');
  }

  iniciarConexão() {
    if (this.socket) {
      console.log('Conexão já estabelecida!');
      return;
    }
    this.socket = new WebSocket('ws://localhost:8080/teste');

    this.socket.onopen = () => {
      this.handleSocketOpen();
    };
    // socket.addEventListener('open', this.handleSocketOpen);
    this.socket.onerror = (error: Event) => {
      this.handleSocketError(error);
    };
    // socket.addEventListener('error', this.handleSocketError);
    this.socket.onclose = () => {
      this.handleSocketClose();
    };
    // socket.addEventListener('close', this.handleSocketClose);
    this.socket.onmessage = (event: MessageEvent) => {
      console.log('Mensagem recebida', event.data);
      this.messages.push(event.data);
    };
  }
}
