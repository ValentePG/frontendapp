import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: WebSocket | null = null;
  messages: string[] = [];
  onConnectionChange: ((isConnected: boolean) => void) | null = null;

  constructor() {}

  startConnection(): void {
    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN) {
        console.log('Conexão já estabelecida!');
        return;
      }
    }

    this.socket = new WebSocket('ws://localhost:8080/teste');

    this.socket.onopen = () => this.handleSocketOpen();

    this.socket.onerror = (error: Event) => this.handleSocketError(error);

    this.socket.onclose = () => this.handleSocketClose();

    this.socket.onmessage = (event: MessageEvent) =>
      this.handleSocketMessage(event);
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
      this.clearMessages();
      console.log('Conexão fechada pelo cliente.');
    }
  }

  private clearMessages(): void {
    this.messages = [];
  }

  private handleSocketError(error: Event): void {
    console.error('Erro no websocket:', error);
  }

  private handleSocketClose(): void {
    console.log('Websocket fechado.');
    this.onConnectionChange?.(false);
  }

  private handleSocketOpen(): void {
    console.log('Websocket conectado.');
    this.onConnectionChange?.(true);
  }

  private handleSocketMessage(event: MessageEvent): void {
    const message = event.data;
    this.messages.push(message);
    console.log('Mensagem recebida:', message);
  }
}
