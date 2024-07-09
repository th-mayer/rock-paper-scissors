import { MatchmakingMatch } from "../../types/socket-connection-types";

export let open_matches: { [match_id: string]: MatchmakingMatch } = {}; //matches that need a second player