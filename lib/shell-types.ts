import type { NodeTy } from "@/lib/interpreter";

export type CommandResult = {
  nodes: NodeTy[];
  cwd?: string[];
};

export type CommandHandler = (
  args: string[],
  ctx: ShellContextValue
) => Promise<CommandResult> | CommandResult;

export type CommandSpec = {
  name: string;
  description: string;
  usage?: string;
  handler: CommandHandler;
};

export type HistoryEntry = {
  id: string;
  cwd: string[];
  input: string;
  output: NodeTy[];
};

export type ShellState = {
  cwd: string[];
  history: HistoryEntry[];
};

export type ShellContextValue = {
  shellState: ShellState;
  run: (input: string) => Promise<void>;
};
