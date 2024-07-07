export function generateRandomItem() {
  let modifier: any;
  const kind = getRandomInt(6);
  switch (kind) { // kind means what kind of item it is:
    case 0: //rock damage
      modifier = randomDamage();
      break;
    case 1: //paper damage
      modifier = randomDamage();
      break;
    case 2: //scissors damage
      modifier = randomDamage();
      break;
    case 3: //rock protection
      modifier = randomDefense();
      break;
    case 4: //paper protection
      modifier = randomDefense();
      break;
    case 5: //scissors protection
      modifier =  randomDefense();
      break;
    default:
      throw Error("Error when generating Item");
  }
  console.log("kind: "+kind+" mod: "+modifier)
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



