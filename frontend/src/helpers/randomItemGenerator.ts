import { Item } from "../types/socket-connection-types";

// TODO finetune modifier values
export function generateRandomItem() {
  let modifier: number;
  const kind = getRandomInt(6);
  switch (kind) {
    case 0:
      // 0 = dmg_r
      // + converts string from toFixed back to a number
      modifier = +Math.random().toFixed(2);
      break;
    case 1:
      // 1 = dmg_p
      modifier = +Math.random().toFixed(2);
      break;
    case 2:
      // 2 = dmg_s
      modifier = +Math.random().toFixed(2);
      break;
    case 3:
      // 3 = prt_r
      modifier = +Math.random().toFixed(2);
      break;
    case 4:
      // 4 = prt_p
      modifier = +Math.random().toFixed(2);
      break;
    case 5:
      // 5 = prt_s
      modifier = +Math.random().toFixed(2);
      break;
    default:
      throw Error("Error when generating Item");
  }
  return { kind, modifier };
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

