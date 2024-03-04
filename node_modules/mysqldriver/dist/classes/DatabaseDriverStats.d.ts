export declare class DatabaseDriverStats {
    state: {
        [key: string]: number;
    };
    constructor();
    private getInitialState;
    incrementStat(statType: DatabaseDriverStatType): void;
    getStat(statType: DatabaseDriverStatType): number;
    reset(): void;
}
export declare enum DatabaseDriverStatType {
    Query = "query"
}
//# sourceMappingURL=DatabaseDriverStats.d.ts.map