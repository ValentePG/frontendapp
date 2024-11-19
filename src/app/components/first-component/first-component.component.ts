import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-first-component',
  imports: [],
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css',
})
export class FirstComponentComponent {
  contador = 0;

  quandoClicado() {
    this.contador += 1;
  }
}
