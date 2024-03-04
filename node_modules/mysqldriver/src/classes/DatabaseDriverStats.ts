export class DatabaseDriverStats {
  state: { [key: string]: number };
  constructor() {
    this.state = this.getInitialState();
  }
  private getInitialState() {
    return {
      [DatabaseDriverStatType.Query]: 0,
    };
  }
  public incrementStat(statType: DatabaseDriverStatType) {
    let count = this.state[statType] || 0;
    count += 1;
    this.state[statType] = count;
  }

  public getStat(statType: DatabaseDriverStatType): number {
    return this.state[statType];
  }

  public reset() {
    this.state = this.getInitialState();
  }
}

export enum DatabaseDriverStatType {
  Query = 'query',
}
