import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterOutlet],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ChatComponent {

}
export default ChatComponent;
