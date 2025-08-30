// Inspired by Will Crichton and Shriram Krishnamurthi. 2024. A Core Calculus for Documents: Or, Lambda: The Ultimate Document. Proc.ACM Program. Lang. 8, POPL, Article 23 (January 2024), 28 pages. https://doi.org/10.1145/3632865
export type NodeTy =
  | { text: string }
  | {
      name: string;
      attrs: Record<string, string | number | undefined>;
      children?: NodeTy[];
    };

export type Value = NodeTy | string;

export const BUILTIN_COMMANDS: Record<
  string,
  {
    description: string;
    handler: (args: string[], ctx: unknown) => Value;
  }
> = {
  echo: {
    description: "Echo arguments",
    handler: (args: string[]) => {
      return { text: args.join(" ") };
    },
  },
  help: {
    description: "Show available commands",
    handler: () => {
      return {
        text:
          "Available commands:\n" +
          Object.keys(BUILTIN_COMMANDS)
            .map((k) => `- ${k}: ${BUILTIN_COMMANDS[k].description}`)
            .join("\n"),
      };
    },
  },
  fetch: {
    description: "Display Jay Lee's information",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "Grid",
            attrs: { gap: 4, base: 1, mdTemplate: "auto_1fr" },
            children: [
              {
                name: "Image",
                attrs: {
                  src: "/profile.jpg",
                  alt: "Jay Lee's profile image",
                  width: 160,
                  height: 160,
                  rounded: 1,
                },
              },
              {
                name: "VStack",
                attrs: { gap: 1 },
                children: [
                  {
                    name: "Text",
                    attrs: { size: "xl", weight: "semibold" },
                    children: [{ text: "Jay Lee" }],
                  },
                  {
                    name: "Text",
                    attrs: { variant: "muted" },
                    children: [
                      {
                        text: "M.S. student in Computer Science | Programming Languages",
                      },
                    ],
                  },
                  {
                    name: "Text",
                    attrs: { size: "sm" },
                    children: [
                      {
                        text: "Applying programming language theory, static analysis, and program synthesis to build ergonomic, reliable tools for real-world programmers.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  },
  news: {
    description: "Show recent news",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "Grid",
            attrs: { gap: 4, base: 1, md: 2 },
            children: [
              {
                name: "VStack",
                attrs: { gap: 2 },
                children: [
                  {
                    name: "Heading",
                    attrs: { level: 3 },
                    children: [{ text: "Recent publications" }],
                  },
                  {
                    name: "List",
                    attrs: {},
                    children: [
                      {
                        text: "OOPSLA 2025 — React-tRace: A Semantics for Understanding React Hooks (Accepted)",
                      },
                      {
                        text: "UIST 2025 Posters — ReDemon UI: Reactive Synthesis by Demonstration for Web UI (Accepted)",
                      },
                      {
                        text: "PLDI 2025 SRC — Retargeting an Abstract Interpreter for a New Language by Partial Evaluation (2nd place 🥈)",
                      },
                    ],
                  },
                ],
              },
              {
                name: "VStack",
                attrs: { gap: 2 },
                children: [
                  {
                    name: "Heading",
                    attrs: { level: 3 },
                    children: [{ text: "Recent honors" }],
                  },
                  {
                    name: "List",
                    attrs: {},
                    children: [
                      {
                        text: "Aug 2025 — SIGPL Summer School Presentation Award (1st place 🥇)",
                      },
                      {
                        text: "Jun 2025 — PLDI 2025 SRC Graduate Category (2nd place 🥈)",
                      },
                      {
                        text: "Sep 2024 — Outstanding Teaching Assistant Award (SNU Engineering)",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  },
};

// Dummy interpreter
export function interpret(command: string) {
  const [name, ...args] = command.split(/\s+/);
  if (!name) throw new Error("Empty command");

  if (name in BUILTIN_COMMANDS) {
    return BUILTIN_COMMANDS[name].handler(args, null);
  }
  return { text: `Unknown command: ${name}` };
}
