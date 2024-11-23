import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-first-component',
  imports: [],
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css',
})
export class FirstComponentComponent {
  contador = 'alguma mensagem';

  handleSocketError(error: any) {
    console.error('Erro no websocket:', error);
  }

  handleSocketClose() {
    console.log('Websocket fechado.');
  }

  handleSocketOpen(socket: WebSocket) {
    console.log('Websocket conectado.');
    socket.send(this.contador);
  }

  quandoClicado() {
    let socket = new WebSocket('ws://localhost:8080/teste');
    socket.onopen = (event) => {
      this.handleSocketOpen(socket);
    };
    // socket.addEventListener('open', this.handleSocketOpen);
    socket.onerror = (error) => {
      this.handleSocketError(error);
    };
    // socket.addEventListener('error', this.handleSocketError);
    socket.onclose = (event) => {
      this.handleSocketClose();
    };
    // socket.addEventListener('close', this.handleSocketClose);
    socket.onmessage = (event) => {
      console.log(event.data);
      this.contador += event.data;
    };

    // this.contador = '';

    // this.contador += 1;
  }
}
