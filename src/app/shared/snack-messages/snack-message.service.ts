import {SnackMessage} from './snack-message.model';
import {Subject} from 'rxjs/Subject';

export class SnackMessageService {

  private messages: SnackMessage[] = [];
  public newMessage: Subject<SnackMessage> = new Subject<SnackMessage>();

  constructor() {
    this.newMessage.subscribe(
      (snackMessage: SnackMessage) => {
        console.log('SNACK_MESSAGE_SERVICE');
        this.messages.push(snackMessage);
      }
    );
  }

}
