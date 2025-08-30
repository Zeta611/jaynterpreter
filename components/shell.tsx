"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useShell } from "@/components/shell-provider";
import { ShellRenderer } from "@/components/shell-renderer";
import { Separator } from "@/components/ui/separator";

function Prompt() {
  const { shellState } = useShell();
  const cwd = "/" + shellState.cwd.join("/");
  return (
    <div className="flex gap-2 items-baseline">
      <div className="shrink-0 select-none">
        <span className="text-primary">world</span>
        <span className="text-muted-foreground">@</span>
        <span className="text-primary">jaylee.xyz</span>
        <span className="ml-0.5 text-orange-600 dark:text-orange-400">
          {cwd || "/"}
        </span>
        <span className="ml-2 text-muted-foreground">$</span>
      </div>
      <InputLine />
    </div>
  );
}

function InputLine() {
  const { run } = useShell();
  const [value, setValue] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setValue("");
    await run(value);
  };

  return (
    <form onSubmit={onSubmit} className="flex-1">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent border-none outline-none font-mono"
        autoFocus
        aria-label="shell input"
      />
    </form>
  );
}

function History() {
  const { shellState } = useShell();
  return (
    <div>
      {shellState.history.map((h) => (
        <div key={h.id}>
          <div className="flex gap-2">
            <div className="text-muted-foreground">$</div>
            <div className="break-words">{h.input}</div>
          </div>
          <div className="mt-1.5">
            <ShellRenderer nodes={h.output} />
          </div>
          <Separator className="my-3" />
        </div>
      ))}
    </div>
  );
}

export default function InteractiveShell() {
  const { shellState: state, run } = useShell();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (state.history.length > 0) return;
    (async () => {
      await run("fetch");
      await run("news");
      await run("help");
    })();
  }, [state.history.length, run]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [state.history.length]);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto py-10 px-4">
        <History />
        <Prompt />
      </div>
      <div ref={endRef} />
    </>
  );
}
