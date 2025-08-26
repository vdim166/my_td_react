import { useEffect } from "react";
import { GameHub } from "../../components/GameHub";
import cls from "./styles.module.scss";
import {
  GameEngine,
  isBeyondLine,
  isPointInCircle,
  moveAlongLine,
  type TempTool,
} from "../../classes/GameEngine";

type EnemyStackType = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  damage: number;

  whenUpdate: number;
  pathIndex: number;
  isDead: boolean;
  speed: number;
  velocity: number;
  health: number;
};

const loadCurrentEnemyStacks: () => EnemyStackType[] = () => {
  // mock
  return [
    {
      x: -30,
      y: 250,
      width: 25,
      height: 25,
      color: "yellow",
      whenUpdate: Date.now() + 5000,
      pathIndex: 0,
      isDead: false,
      damage: 50,
      speed: 500,
      velocity: 40,
      health: 100,
    },
    {
      x: -30,
      y: 250,
      width: 25,
      height: 25,
      color: "red",
      whenUpdate: Date.now() + 5000,
      pathIndex: 0,
      isDead: false,
      damage: 50,
      speed: 500,
      velocity: 40,
      health: 100,
    },
  ];
};

type EnemyType = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  whenUpdate: number;
  pathIndex: number;
  isDead: boolean;
  damage: number;
  speed: number;
  velocity: number;
  health: number;
};

type TowerType = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  damage: number;
};

const TOOLS = { BUY_TOWER: "BUY_TOWER" } as const;

export const GameInstance = () => {
  useEffect(() => {
    let animationFrameId: null | number = null;
    let stopGame = false;

    let selectedTool: keyof typeof TOOLS | null = TOOLS.BUY_TOWER;

    const startGame = async () => {
      let tempTool: TempTool | null = null;

      const enemies: EnemyType[] = [];
      let enemiesStack: EnemyStackType[] | null = null;

      const towers: TowerType[] = [];

      const queue = [
        {
          name: "wait",
          action: async () => {
            await new Promise((res) => setTimeout(res, 3000));
          },
        },
        {
          name: "add enemy",
          action: () => {
            const enemy = enemiesStack[0];
            enemies.push(enemy);
            enemiesStack.splice(0, 1);
          },
        },
        {
          name: "wait",
          action: async () => {
            await new Promise((res) => setTimeout(res, 5000));
          },
        },
        {
          name: "add enemy",
          action: () => {
            const enemy = enemiesStack[0];
            enemies.push(enemy);
            enemiesStack.splice(0, 1);
          },
        },
      ];

      const gameCanvas = document.getElementById(
        "gameCanvas"
      ) as HTMLCanvasElement;

      const gameEngine = new GameEngine(gameCanvas);

      gameCanvas.addEventListener("mousemove", (e) => {
        if (selectedTool === TOOLS.BUY_TOWER) {
          tempTool = {
            x: e.clientX - 25,
            y: e.clientY - 25,
            width: 50,
            height: 50,
            color: "red",
          };
        }
      });

      gameCanvas.addEventListener("click", (e) => {
        if (selectedTool === TOOLS.BUY_TOWER) {
          selectedTool = null;

          const newTower = { ...tempTool } as TowerType;

          // newTower.attackPeriod = Date.now();
          newTower.damage = 50;

          // const { status, money } = moneyController.spendMoney(50);

          // if (status) {
          // moneyHtml.innerHTML = money;

          towers.push(newTower);
          // }

          tempTool = null;
        }
      });

      gameEngine.drawBackground();

      const canvas = gameEngine.getCanvas();

      const currentPath = [
        {
          x: 0,
          y: 250,
        },
        {
          x: canvas.width / 2,
          y: 250,
        },
        {
          x: canvas.width / 2,
          y: 450,
        },
        {
          x: canvas.width / 2 + 300,
          y: 450,
        },
      ];

      gameEngine.drawPath(currentPath);

      const castle = {
        ...currentPath[currentPath.length - 1],
        width: 100,
        height: 150,
        color: "#888",
      };

      castle.y -= castle.height - 15;

      gameEngine.drawCastle(castle);

      function renderGame() {
        gameEngine.drawBackground();
        gameEngine.drawPath(currentPath);

        gameEngine.drawTempTools(tempTool);
        gameEngine.drawTowers(towers);

        const castle = {
          ...currentPath[currentPath.length - 1],
          width: 100,
          height: 150,
          color: "#888",
        };

        castle.y -= castle.height - 15;

        gameEngine.drawCastle(castle);
        gameEngine.drawEnemies(enemies);
      }

      function updateGame() {
        let enemiesDead = 0;

        const allEnemiesInLevel = queue.filter(
          (a) => a.name === "add enemy"
        ).length;

        for (let i = 0; i < enemies.length; ++i) {
          const enemy = enemies[i];

          if (enemy.isDead) {
            enemiesDead += 1;
            continue;
          }

          if (enemy.health <= 0) {
            enemy.isDead = true;
            enemiesDead += 1;

            // const money = moneyController.addMoney(10);
            // moneyHtml.innerHTML = money;
            continue;
          }

          const path = currentPath[enemy.pathIndex];
          const nextPath = currentPath[enemy.pathIndex + 1];
          const myLine = {
            p1: { x: path.x, y: path.y },
            p2: { x: nextPath.x, y: nextPath.y },
          };

          if (enemy.whenUpdate < Date.now()) {
            const newPosition1 = moveAlongLine(
              myLine,
              { x: enemy.x, y: enemy.y },
              enemy.velocity
            );

            const { after } = isBeyondLine(myLine, {
              x: newPosition1.x,
              y: newPosition1.y,
            });

            if (after) {
              enemy.x = nextPath.x;
              enemy.y = nextPath.y;
              enemy.whenUpdate = Date.now() + enemy.speed;

              enemy.pathIndex += 1;

              if (currentPath.length - 1 === enemy.pathIndex) {
                // should do damage
                console.log("damage", enemy);

                // hpBarHtml.innerHTML = hpController.attack(enemy.damage);

                enemy.isDead = true;
              }
            } else {
              enemy.x = newPosition1.x;
              enemy.y = newPosition1.y;
              enemy.whenUpdate = Date.now() + enemy.speed;
            }
          }

          // towers
        }

        // if (hpController.isDead()) {
        //   loseHandle();
        //   return;
        // }

        if (enemiesDead === allEnemiesInLevel) {
          // winHandle();
          return;
        }

        for (let i = 0; i < towers.length; ++i) {
          const tower = towers[i];

          if (tower.attackPeriod > Date.now()) {
            continue;
          }

          for (let j = 0; j < enemies.length; ++j) {
            const enemy = enemies[j];
            if (enemy.isDead) {
              continue;
            }

            const isInCircle = isPointInCircle(
              { x: tower.x, y: tower.y },
              150,
              {
                x: enemy.x,
                y: enemy.y,
              }
            );

            if (isInCircle) {
              // do damage to enemy
              console.log("attack");
              tower.attackPeriod = Date.now() + 2000;
              enemy.health -= tower.damage;
            }
          }
        }
      }

      function gameLoop() {
        if (stopGame) return;
        gameEngine.clearCanvas();

        updateGame();
        renderGame();
        animationFrameId = requestAnimationFrame(gameLoop);
      }

      function stopGameLoop() {
        stopGame = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }

      const winHandle = () => {
        console.log("game is over");

        stopGameLoop();

        // const index = levels.findIndex((l) => l.name === currentLevel);

        // const isLast = index === levels.length - 1;

        // if (isLast) {
        //   companyEndHandle();
        // } else {
        //   nextLevel();
        // }
      };

      const loseHandle = () => {
        console.log("You lose");

        stopGameLoop();
      };

      const runGame = async () => {
        enemiesStack = loadCurrentEnemyStacks();
        stopGame = false;
        animationFrameId = requestAnimationFrame(gameLoop);
        // await startTimer();

        for (let i = 0; i < queue.length; i++) {
          await queue[i].action();
        }

        // game is over
      };

      runGame();
    };

    startGame();

    return () => {
      function stopGameLoop() {
        stopGame = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
      stopGameLoop();
    };
  }, []);

  return (
    <div className={cls.main}>
      <div className={cls.healthHub}>
        HP:<span>100</span>%
      </div>
      <GameHub />
      <div className={cls.timer}></div>
      <canvas id="gameCanvas" width="800" height="600"></canvas>
    </div>
  );
};
