import { Socket } from "socket.io";

export type Match = {
  level: number;
  player1: Player;
  player2: Player | null;
  instance: GameInstance | null;
};

export type Player = {
  name: string;
  level: number;
  items: Item[];
  socket: Socket;
  token: string;
};

export type PlayerStats = {
  hp: number;
  symbol: string | null;
  dmg_modifier: Modifier;
  protection_modifier: Modifier;
  chosen: boolean;
};

export type Modifier = {
  rock: number;
  paper: number;
  scissors: number;
};

export type GameInstance = {
  player1: PlayerStats;
  player2: PlayerStats;
};

// export type Items = [ Item, Item, Item ]

export type Item = {
  name: string;
  description: string;
  kind: number;
  modifier: number;
};
