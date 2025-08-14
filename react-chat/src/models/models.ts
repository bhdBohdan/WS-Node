export type MessageDTO = {
  id: string;
  text: string;
  username: string;
  senderId: string;
  channel: string;
  timestamp: number;
};

export type DirMesDTO = {
  id: string;
  text: string;
  username: string;
  senderId: string;
  to: string;
  from: string;
  timestamp: number;
};

export type CurrentChat = {
  type: "channel" | "dm";
  name: string;
};
