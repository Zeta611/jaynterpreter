"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { interpret } from "@/lib/interpreter";
import type {
  ShellContextValue,
  ShellState,
  HistoryEntry,
} from "@/lib/shell-types";
import type { NodeTy } from "@/lib/interpreter";

const ShellContext = createContext<ShellContextValue | null>(null);

function makeId() {
  return crypto.randomUUID();
}

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used within ShellProvider");
  return ctx;
}

export default function ShellProvider({
  children,
  initialCwd = [],
  initialHistory = [],
}: {
  children: React.ReactNode;
  initialCwd?: string[];
  initialHistory?: HistoryEntry[];
}) {
  const [shellState, setShellState] = useState<ShellState>({
    cwd: initialCwd,
    history: initialHistory,
  });

  const run = useCallback(
    async (input: string) => {
      const trimmed = input.trim();

      let nextOutput: NodeTy[] = [];

      // Special-case: cd updates URL and cwd
      // Default: run user's interpreter and adapt to IR
      try {
        const value = interpret(trimmed);
        nextOutput = Array.isArray(value)
          ? (value as unknown as NodeTy[])
          : [value as unknown as NodeTy];
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        nextOutput = [{ text: message }];
      }

      const entry: HistoryEntry = {
        id: makeId(),
        cwd: shellState.cwd,
        input,
        output: nextOutput,
      };

      setShellState((s) => ({
        cwd: s.cwd,
        history: [...s.history, entry],
      }));
    },
    [shellState]
  );

  const ctxValue: ShellContextValue = useMemo(
    () => ({
      shellState,
      run,
    }),
    [shellState, run]
  );

  return <ShellContext value={ctxValue}>{children}</ShellContext>;
}
