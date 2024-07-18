import { OnRampStatus } from ".prisma/client";

export interface User {
    id: number;
    email?: string | null;
    name?: string | null;
    number: string;
    password: string;
    OnRampTransaction: OnRampTransaction[];
    Balance: Balance[];
    sentTransfers: P2PTransfer[];
    receivedTransfers: P2PTransfer[];
  }
  export interface P2PTransfer {
    id: number;
    amount: number;
    timestamp: Date;
    fromUserId: number;
    fromUser: User;
    toUserId: number;
    toUser: User;
  }
  export interface Balance {
    id: number;
    userId: number;
    amount: number;
    locked: number;
    user: User;
  }
  export interface OnRampTransaction {
    id: number;
    status: OnRampStatus;
    token: string;
    provider: string;
    amount: number;
    startTime: Date;
    userId: number;
    user: User;
  }