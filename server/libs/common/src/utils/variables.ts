export enum TokenType {
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

export enum ContactStatus {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  ACCEPTED = 'ACCEPTED',
  FRIENDS = 'FRIENDS',
}

export enum ContactType {
  SENDER = 'SENT',
  RECEIVER = 'RECEIVED',
}
export interface ContactNotification {
  status: string;
  userID: string;
  contactID: string;
}
