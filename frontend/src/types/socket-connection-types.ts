import { Socket } from "socket.io-client";

export type Match = {
  player1: Player;
  player2: Player | null;
  instance: GameInstance | null;
};

export type Player = {
  name: string;
  wins: number;
  items: Item[];
  socket: Socket;
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

export type Item = {
  kind: number;
  modifier: number;
};

export type PlayerData = {
  name: string;
  wins: number;
  health: number;
  items: Item[];
};
