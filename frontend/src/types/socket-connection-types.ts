export type Match = {
  level: number,
  player1: Player,
  player2: Player | null,
  instance: GameInstance | null,
}

export type Player = {
  name: string,
  level: number,
  items: Items,
  socket: any, // kp wie ein socket.io socket aufgebaut ist
}

export type PlayerStats = {
  hp: number,
  symbol: string | null,
  dmg_modifier: Modifier,
  protection_modifier: Modifier,
  chosen: boolean
}

export type Modifier = {
  rock: number,
  paper: number,
  scissors: number,
}

export type GameInstance = {
  player1: PlayerStats,
  player2: PlayerStats,
}

export type Items = {
  item1: Item,
  item2: Item,
  item3: Item,
}

export type Item = {
  type: string,
  name: string,
  discription: string,
}

export type PlayerData = {
  name: string,
  level: number,
  health: number,
  items: Items
}
