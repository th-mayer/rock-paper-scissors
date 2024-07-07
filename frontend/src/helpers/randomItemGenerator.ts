import { Item } from "../types/socket-connection-types";

// TODO finetune modifier values
export function generateRandomItem() {
  let modifier: any;
  const kind = getRandomInt(5);
  switch (kind) {
    case 0:
      // 0 = dmg_r
      // + converts string from toFixed back to a number
      modifier = randomDamage();
      break;
    case 1:
      // 1 = dmg_p
      modifier = randomDamage();
      break;
    case 2:
      // 2 = dmg_s
      modifier = randomDamage();
      break;
    case 3:
      // 3 = prt_r
      modifier = randomDefense();
      break;
    case 4:
      // 4 = prt_p
      modifier = randomDefense();
      break;
    case 5:
      // 5 = prt_s
      modifier =  randomDefense();
      break;
    default:
      throw Error("Error when generating Item");
  }
  return { kind, modifier };
}

function getRandomInt(max: number) {
  return Math.floor(Math.random()*max)
}

function randomDamage(){
  let dmgModifier = 1.15;
  while (true){
    if(Math.random() < 0.8) dmgModifier += 0.05;
    else return dmgModifier.toFixed(2);
  }
}

function randomDefense(){
  let defModifier = 0.95;
  while (true){
    if(Math.random() < 0.8) defModifier *= 0.97;
    else return defModifier.toFixed(2);
  }
}



