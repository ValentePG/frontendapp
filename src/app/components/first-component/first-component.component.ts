import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-component',
  imports: [FormsModule],
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css',
})
export class FirstComponentComponent {
  address = '';
  messages: string[] = [];

  socket!: WebSocket;

  handleSocketError(error: any) {
    console.error('Erro no websocket:', error);
  }

  handleSocketClose() {
    console.log('Websocket fechado.');
  }

  handleSocketOpen(socket: WebSocket) {
    console.log('Websocket conectado.');
  }

  iniciarConexão() {
    this.socket = new WebSocket('ws://localhost:8080/teste');

    this.socket.onopen = () => {
      this.handleSocketOpen(this.socket);
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

  enviarMensagem(address: string) {
    console.log('clicado');
    try {
      console.log('Estado do WebSocket:', this.socket.readyState);
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(address);
        console.log('Mensagem enviada: ', address);
      } else {
        console.error(
          'WebSocket não está conectado. Estado atual:',
          this.socket.readyState
        );
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem');
    }
  }

  digitou() {
    console.log('digitou');
  }

  quandoClicado() {
    this.iniciarConexão();
    // teste.innerHTML += `Foi isso que digitou?: ${address}
    //   <br>
    // `;
  }
}
