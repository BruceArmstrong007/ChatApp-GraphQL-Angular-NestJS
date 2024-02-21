import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    NgFor,
  ],
  template: `
    <mat-drawer-container class="example-container" autosize>
      <mat-drawer #drawer class="example-sidenav" mode="side">
        <p>Auto-resizing sidenav</p>
        @if (showFiller) {
          <p>Lorem, ipsum dolor sit amet consectetur.</p>
        }
        <button (click)="showFiller = !showFiller" mat-raised-button>
          Toggle extra text
        </button>
      </mat-drawer>
      <div class="example-sidenav-content">
        <mat-card>
          <mat-card-content>
            <button type="button" mat-button (click)="drawer.toggle()">
              Toggle sidenav
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </mat-drawer-container>
    <mat-card>
      <mat-card-content>
        <button type="button" mat-button (click)="drawer.toggle()">
          Toggle sidenav
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .example-container {
      width: 500px;
      height: 300px;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }

    .example-sidenav-content {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    .example-sidenav {
      padding: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoginComponent {
  showFiller = false;
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
}
export default LoginComponent;
