export class ChatMessage {
  id?: string;
  userId: string;
  clientId: string;
  channel: string;
  messageIn: string;
  messageOut: string;
  contextSnapshot: object;
  createdAt?: Date;

  constructor(props: {
    id?: string;
    userId: string;
    clientId: string;
    channel: string;
    messageIn: string;
    messageOut: string;
    contextSnapshot: object;
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.clientId = props.clientId;
    this.channel = props.channel;
    this.messageIn = props.messageIn;
    this.messageOut = props.messageOut;
    this.contextSnapshot = props.contextSnapshot;
    this.createdAt = props.createdAt;
  }
}
