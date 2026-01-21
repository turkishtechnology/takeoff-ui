import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TkButton, TkInput, TextValueAccessor } from '@takeoff-ui/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TkButton,
    TkInput,
    TextValueAccessor,
    ReactiveFormsModule,
    JsonPipe,
    FormsModule,
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Takeoff UI Angular Demo');
  private readonly fb = inject(FormBuilder);

  formGroup: FormGroup = this.fb.group({
    firstname: ['test'],
  });

  onButtonClick(): void {
    console.log('Button clicked!');
  }

  onInputChange(): void {
    console.log('input change');
  }

  textValue = 'harun';
}
