// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}