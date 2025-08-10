import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TkButton } from 'component-library-angular/dist';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TkButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-app');
}
