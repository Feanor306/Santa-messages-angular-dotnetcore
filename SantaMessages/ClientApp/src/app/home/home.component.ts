import { Component, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from './message-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  server_message: string;
  server_error: boolean = false;
  @ViewChild('text_input', { static: false }) text_input: ElementRef;

  constructor(private message_service: MessageService) { }

  onSendMessage() {
    let message_val = this.text_input.nativeElement.value;
    this.message_service.
      sendMessage(message_val).subscribe(
        (response: any) => {
          if (response.status == 200) {
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            this.server_message = 'HO HO HO! Santa Received your message at: ' + time;
            this.server_error = false;
            this.text_input.nativeElement.value = '';
            this.text_input.nativeElement.focus();
            console.log(response.body.status + ':' + response.body.message);
          } else {
            this.server_message = 'Naughty Server has a problem!';
            this.server_error = true;
            console.log(response.status + ' ' + response.body.status);
          }
        }
      );
  }
}
