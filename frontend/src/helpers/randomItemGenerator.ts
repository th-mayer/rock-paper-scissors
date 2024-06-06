import { Item } from "../types/socket-connection-types";

// TODO finetune modifier values
export function generateRandomItem(): Item {
  let name, description: string;
  let modifier: number;
  const kind = getRandomInt(6);
  switch (kind) {
    case 0:
      // 0 = dmg_r
      name = "Rock Damage";
      modifier = Math.random();
      description = `Grants extra damage when using Rock with a modifier of ${modifier}`;
      break;
    case 1:
      // 1 = dmg_p
      name = "Paper Damage";
      modifier = Math.random();
      description = `Grants extra damage when using Paper with a modifier of ${modifier}`;
      break;
    case 2:
      // 2 = dmg_s
      name = "Scissors Damage";
      modifier = Math.random();
      description = `Grants extra damage when using Scissors with a modifier of ${modifier}`;
      break;
    case 3:
      // 3 = prt_r
      name = "Rock Protection";
      modifier = Math.random();
      description = `Grants extra protection against attacks using Rock with a modifier of ${modifier}`;
      break;
    case 4:
      // 4 = prt_p
      name = "Paper Protection";
      modifier = Math.random();
      description = `Grants extra protection against attacks using Paper with a modifier of ${modifier}`;
      break;
    case 5:
      // 5 = prt_s
      name = "Scissors Protection";
      modifier = Math.random();
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

