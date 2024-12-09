import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/webSocketService.service';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  message = '';
  nome = '';
  messages: string[];
  isNamed: boolean = false;
  isConnected: boolean = false;

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.onConnectionChange = (isConnected: boolean) => {
      this.isConnected = isConnected;
    };
    this.messages = this.webSocketService.messages;
  }

  sendMessage(address: string): void {
    if (!this.isWebSocketConnected()) {
      console.error('O WebSocket não está conectado');
      return;
    }

    try {
      this.webSocketService?.socket?.send(address);
      console.log('Mensagem enviada: ', address);
    } catch (error) {
      console.error(
        'A mensagem não foi enviada, possivelmente um erro do servidor'
      );
    }
  }

  private isWebSocketConnected(): boolean {
    if (!this.webSocketService.socket) {
      return false;
    }

    const socketState = this.webSocketService.socket.readyState;
    console.log('Estado do WebSocket:', socketState);

    if (socketState !== WebSocket.OPEN) {
      console.log('Este webSocket não está aberto');
      return false;
    }

    return true;
  }

  // função para validar se o nome é vazio
  private validateName(): boolean {
    if (this.nome === '' || this.nome.length < 4) {
      alert('Nome não pode ser vazio ou menor que 4 caracteres');
      return false;
    }
    return true;
  }

  private clearMessages(): void {
    this.messages = [];
  }

  connectionStart(): void {
    if (this.validateName()) {
      this.webSocketService.startConnection();
      this.isNamed = true;
    }

    if (this.messages.length === 0) {
      this.messages = this.webSocketService.messages;
    }

    // this.isConnected = true;
  }

  connectionStop(): void {
    this.webSocketService.closeConnection();
    this.clearMessages();
  }
}
