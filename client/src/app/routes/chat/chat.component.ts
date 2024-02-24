import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="flex flex-column h-full">
      <app-navbar> </app-navbar>
      <div class="flex justify-center flex-grow">
        <router-outlet />
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ChatComponent {}
export default ChatComponent;
