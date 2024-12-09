import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketConfigure } from '../../WebSocketConfigure/WebSocketConfigure';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  message = '';
  webSocket: WebSocketConfigure = new WebSocketConfigure();
  messages: string[] = this.webSocket.messages;
  isConnected: boolean = false;

  constructor() {
    this.webSocket.onConnectionChange = (isConnected: boolean) => {
      this.isConnected = isConnected;
    };
  }

  sendMessage(address: string) {
    if (!this.isWebSocketConnected()) {
      console.error('O WebSocket não está conectado');
      return;
    }

    try {
      this.webSocket.socket?.send(address);
      console.log('Mensagem enviada: ', address);
    } catch (error) {
      console.error(
        'A mensagem não foi enviada, possivelmente um erro do servidor'
      );
    }
  }

  private isWebSocketConnected(): boolean {
    if (!this.webSocket.socket) {
      return false;
    }

    const socketState = this.webSocket.socket.readyState;
    console.log('Estado do WebSocket:', socketState);

    if (socketState !== WebSocket.OPEN) {
      console.log('Este webSocket não está aberto');
      return false;
    }

    return true;
  }

  connectionStart() {
    this.webSocket.startConnection();
    this.isConnected = true;
  }

  connectionStop() {
    this.webSocket.closeConnection();
  }
}
