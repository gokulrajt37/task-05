let hero = {
  left: 575,
  top: 700,
};
let missiles = [];
let enemies = [
  { left: 200, top: 100 },
  { left: 300, top: 100 },
  { left: 400, top: 100 },
  { left: 500, top: 100 },
  { left: 600, top: 100 },
  { left: 700, top: 100 },
  { left: 800, top: 100 },
  { left: 900, top: 100 },
  { left: 200, top: 175 },
  { left: 300, top: 175 },
  { left: 400, top: 175 },
  { left: 500, top: 175 },
  { left: 600, top: 175 },
  { left: 700, top: 175 },
  { left: 800, top: 175 },
  { left: 900, top: 175 },
];
document.onkeydown = function moveHero(event) {
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;
  const space = 32;
  console.log(event.keyCode);
  if (event.keyCode === left && hero.left > 10) {
    hero.left = hero.left - 15;
    document.querySelector("#hero").style.left = hero.left;
  }
  if (event.keyCode === right && hero.left < 1140) {
    hero.left = hero.left + 15;
    document.querySelector("#hero").style.left = hero.left;
  }
  if (event.keyCode === up && hero.top > 240) {
    hero.top = hero.top - 15;
    document.querySelector("#hero").style.top = hero.top;
  }
  if (event.keyCode === down && hero.top < 720) {
    hero.top = hero.top + 15;
    document.querySelector("#hero").style.top = hero.top;
  }
  if (event.keyCode === space) {
    missiles.push({
      left: hero.left + 20,
      top: hero.top - 20,
    });
    drawMissiles();
  }
};
function drawEnemies() {
  document.querySelector("#enemies").innerHTML = "";
  enemies.forEach((pos) => {
    document.querySelector("#enemies").innerHTML += `
        <div class="enemy" style="left:${pos.left}; top: ${pos.top}"></div>
        `;
  });
}
function drawMissiles() {
  document.querySelector("#missiles").innerHTML = "";
  missiles.forEach((pos) => {
    document.querySelector("#missiles").innerHTML += `
        <div class="missile1" style="left:${pos.left}; top: ${pos.top}"></div>
        `;
  });
}
function updateMissilesPosition() {
  missiles = missiles.map((pos) => ({ ...pos, top: pos.top - 30 }));
}
function updateEnemiesPosition() {
  enemies = enemies.map((pos) => ({ ...pos, top: pos.top + 10 }));
}
function checkCollision() {
  for (let enemy = 0; enemy < enemies.length; enemy++) {
    for (let missile = 0; missile < missiles.length; missile++) {
      if (
        missiles[missile].top >= enemies[enemy].top &&
        missiles[missile].top <= enemies[enemy].top + 50 &&
        missiles[missile].left >= enemies[enemy].left &&
        missiles[missile].left <= enemies[enemy].left + 50
      ) {
        enemies.splice(enemy, 1);
        missiles.splice(missile, 1);
      }
    }
  }
}

function gameEnd() {
  // const enemiesReached = enemies.top;
  const allEnemiesSize = enemies.length;
  if (allEnemiesSize === 0) {
    const container = document.querySelector("#background");
    const result = document.createElement("div");
    result.className = "result";
    result.innerText = "You Won 🏆";
    container.append(result);
    clearInterval(clearAll);
    document.onkeydown = null;
  } else {
    for (enemy = 0; enemy < enemies.length; enemy++) {
      if (enemies[enemy].top >= hero.top - 40) {
        container = document.querySelector("#background");
        result = document.createElement("div");
        result.className = "result";
        result.innerText = "You Lose 🤦";
        container.append(result);
        clearInterval(clearAll);
        document.onkeydown = null;
      }
    }
  }
  // if (allEnemiesSize !== 0 && enemies.top > 650) {
  //   const container = document.querySelector("#background");
  //   const result = document.createElement("div");
  //   result.className = "result";
  //   result.innerText = "You Lose 🏆";
  //   container.append(result);
  // }
}

clearAll = setInterval(() => {
  updateEnemiesPosition();
  drawEnemies();
  updateMissilesPosition();
  drawMissiles();
  checkCollision();
  gameEnd();
}, 1000 / 2);
// updateEnemiesPosition();
drawEnemies();
