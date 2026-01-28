import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { TkButton, TkInput, TextValueAccessor } from '@takeoff-ui/angular';

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
  private readonly fb = inject(FormBuilder);

  formGroup: FormGroup = this.fb.group({
    firstname: [''],
    surname: [''],
  });

  onButtonClick(): void {
    alert('Button clicked!');
  }
}
