export type Match = {
  level: number,
  player1: Player,
  player2: Player,

}

export type Player = {
  hp: number,
  symbol: string | undefined,
  dmg_modifier: Modifier,
  protection_modifier: Modifier,
}

export type Modifier = {
  rock: number,
  paper: number,
  scissors: number,
}