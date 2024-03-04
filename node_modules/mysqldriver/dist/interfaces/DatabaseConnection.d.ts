export interface DatabaseConnection {
    destroy(): void;
    on(event: ConnectionEvent, handler: (...args: any[]) => void): void;
    query(query: string, values: any[], callback: (err: Error | null, rows: any[] | null) => void): void;
    end(callback: (err: Error | null | undefined) => void): void;
    isDisconnected: () => boolean;
}
export declare type ConnectionEvent = 'error' | null;
//# sourceMappingURL=DatabaseConnection.d.ts.map