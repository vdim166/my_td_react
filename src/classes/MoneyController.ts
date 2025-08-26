export class MoneyController {
  private money: number;
  constructor(initial = 0) {
    this.money = initial;
  }

  getMoney() {
    return this.money;
  }

  setMoney(value: number) {
    this.money = value;
  }

  addMoney(value: number) {
    this.money += value;
    return this.money;
  }

  spendMoney(value: number) {
    if (value > this.money) {
      return { status: false, money: this.money };
    }

    this.money -= value;
    return {
      status: true,
      money: this.money,
    };
  }
}
