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
  address = '';
  webSocket: WebSocketConfigure = new WebSocketConfigure();
  messages: string[] = this.webSocket.messages;

  digitou() {
    console.log('digitou');
  }

  enviarMensagem(address: string) {
    console.log('clicado');
    if (this.webSocket.socket) {
      try {
        console.log('Estado do WebSocket:', this.webSocket.socket.readyState);
        if (this.webSocket.socket.readyState === WebSocket.OPEN) {
          this.webSocket.socket.send(address);
          console.log('Mensagem enviada: ', address);
        } else {
          console.log('Este webSocket não está aberto');
        }
      } catch (error) {
        console.error(
          'A mensagem não foi enviada, possivelmente um erro do servidor'
        );
      }
    } else {
      console.log(
        'A conexão ainda não foi estabelecida, tente se conectar antes de enviar a mensagem!'
      );
    }
  }

  quandoClicado() {
    this.webSocket.iniciarConexão();
    // teste.innerHTML += `Foi isso que digitou?: ${address}
    //   <br>
    // `;
  }
}
