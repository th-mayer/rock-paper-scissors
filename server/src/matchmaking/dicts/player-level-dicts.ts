import { Match } from "../../types/socket-connection-types";

// Matchmaking dicts, when waiting you will be put further down to ensure a match
export let matchmaking_diff_1: { [match_id: string]: Match }; // matches players with +/- 1 level
export let matchmaking_diff_10: { [match_id: string]: Match }; // matches players with +/- 10 levels
export let matchmaking_diff_any: { [match_id: string]: Match }; // matches players with any level
