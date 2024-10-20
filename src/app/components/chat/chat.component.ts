import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage, ChatMessageForSendingv2 } from '../../models/chatMessage.model'; 




@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];
  newMessage: ChatMessageForSendingv2 = {
    text: '',
    date: ''
  };

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.listMessage();
  }

  // Función para obtener la fecha actual como string
  getCurrentDateString(): string {
    const currentDate = new Date();
    // Formato: dd/MM/yyyy HH:mm:ss
    const dateString = currentDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return dateString;
  }

  sendMessage(): void {
    if (this.message) {
      this.newMessage.text=this.message;
      this.newMessage.date=this.getCurrentDateString();
      this.messages.push({ text: this.newMessage.text, type: 'sent',date:this.newMessage.date });
      this.chatService.sendMessage(this.newMessage);
      this.message = '';
      this.scrollToBottom(); // Forzar el scroll hacia abajo

    }
  }

  listMessage(){
    this.chatService.getMessage().subscribe((data) => {
      console.log('Mensaje recibido:', data);
      this.messages.push({ text: data.text, type: 'received', date:data.date});
      console.log(data);
      this.scrollToBottom(); // Forzar el scroll hacia abajo cuando se recibe un mensaje
    });
  }
  
  scrollToBottom(): void {
    const messageContainer = document.querySelector('.chat-messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

}




