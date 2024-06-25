import { Item } from "../types/socket-connection-types";

// TODO finetune modifier values
export function generateRandomItem(): Item {
  let name, description: string;
  // + converts string from toFixed back to a number
  let modifier: number = +Math.random().toFixed(2);
  const kind = getRandomInt(6);
  switch (kind) {
    case 0:
      // 0 = dmg_r
      name = "Rock Damage";
      description = `Grants extra damage when using Rock with a modifier of ${modifier}`;
      break;
    case 1:
      // 1 = dmg_p
      name = "Paper Damage";
      description = `Grants extra damage when using Paper with a modifier of ${modifier}`;
      break;
    case 2:
      // 2 = dmg_s
      name = "Scissors Damage";
      description = `Grants extra damage when using Scissors with a modifier of ${modifier}`;
      break;
    case 3:
      // 3 = prt_r
      name = "Rock Protection";
      description = `Grants extra protection against attacks using Rock with a modifier of ${modifier}`;
      break;
    case 4:
      // 4 = prt_p
      name = "Paper Protection";
      description = `Grants extra protection against attacks using Paper with a modifier of ${modifier}`;
      break;
    case 5:
      // 5 = prt_s
      name = "Scissors Protection";
      description = `Grants extra protection against attacks using Scissors with a modifier of ${modifier}`;
      break;
    default:
      throw Error("Error when generating Item");
  }
  return { name, description, kind, modifier };
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

