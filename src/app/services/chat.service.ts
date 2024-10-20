import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ChatMessage, ChatMessageForSendingv2 } from '../models/chatMessage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(msg: ChatMessageForSendingv2) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return this.socket.fromEvent<ChatMessageForSendingv2>('message-receive');
    
  }
}
