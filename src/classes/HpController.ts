export class HpController {
  private hp: number;
  constructor() {
    this.hp = 100;
  }

  getHp() {
    return this.hp;
  }

  setHp(amount: number) {
    this.hp = amount;
  }

  attack(amount: number) {
    this.hp -= amount;

    return this.hp;
  }

  isDead() {
    return this.hp <= 0;
  }
}
