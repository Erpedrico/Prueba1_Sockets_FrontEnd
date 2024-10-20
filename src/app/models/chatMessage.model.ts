export interface ChatMessage {
    text: string;
    type: 'sent' | 'received'; // Solo estos dos tipos
    date: string;
}  

export type ChatMessageForSendingv2 = Pick<ChatMessage, 'text'|'date'>