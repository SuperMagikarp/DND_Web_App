export interface DebugConfig {
  enabled: boolean;
  logger: (val: string, debugInfo?: any) => void;
}
