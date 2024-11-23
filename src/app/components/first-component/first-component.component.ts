import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-first-component',
  imports: [],
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css',
})
export class FirstComponentComponent {
  contador = 0;

  handleSocketError(error: any) {
    console.error('Erro no websocket:', error);
  }

  handleSocketClose() {
    console.log('Websocket fechado.');
  }

  handleSocketOpen() {
    console.log('Websocket conectado.');
  }

  quandoClicado() {
    // const socket: WebSocket = new WebSocket('ws://localhost:8080/teste');
    // socket.addEventListener('open', this.handleSocketOpen);
    // socket.addEventListener('error', this.handleSocketError);
    // socket.addEventListener('close', this.handleSocketClose);
    // socket.onmessage = (event) => {
    //   console.log(event.data);
    //   this.contador += event.data;
    // };

    this.contador += 1;
  }
}
