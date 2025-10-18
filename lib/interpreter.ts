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
      const items = Object.keys(BUILTIN_COMMANDS).map(
        (k) =>
          ({
            name: "HStack",
            attrs: { gap: 2 },
            children: [
              { name: "Cmd", attrs: { cmd: k }, children: [{ text: k }] },
              {
                name: "Text",
                attrs: { variant: "muted" },
                children: [{ text: `${BUILTIN_COMMANDS[k].description}` }],
              },
            ],
          }) as NodeTy,
      );
      return {
        name: "VStack",
        attrs: { gap: 2 },
        children: [
          {
            name: "Text",
            attrs: {},
            children: [{ text: "Available commands:" }],
          },
          {
            name: "List",
            attrs: {},
            children: items,
          },
        ],
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
                    name: "VStack",
                    attrs: { gap: 3 },
                    children: [
                      {
                        name: "VStack",
                        attrs: { gap: 1 },
                        children: [
                          {
                            name: "Text",
                            attrs: {},
                            children: [
                              {
                                text: "OOPSLA 2025 — React‑tRace: A Semantics for Understanding React Hooks",
                              },
                            ],
                          },
                          {
                            name: "HStack",
                            attrs: { gap: 2 },
                            children: [
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://doi.org/10.1145/3763067",
                                  icon: "paper",
                                },
                                children: [{ text: "paper" }],
                              },
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://github.com/Zeta611/react-trace",
                                  icon: "github",
                                },
                                children: [{ text: "github" }],
                              },
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://2025.splashcon.org/details/OOPSLA/54/",
                                  icon: "link",
                                },
                                children: [{ text: "event" }],
                              },
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://react-trace.vercel.app/",
                                  icon: "link",
                                },
                                children: [{ text: "live" }],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        name: "VStack",
                        attrs: { gap: 1 },
                        children: [
                          {
                            name: "Text",
                            attrs: {},
                            children: [
                              {
                                text: "UIST 2025 Posters — ReDemon UI: Reactive Synthesis by Demonstration for Web UI (Best Poster Honorable Metion Award)",
                              },
                            ],
                          },
                          {
                            name: "HStack",
                            attrs: { gap: 2 },
                            children: [
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://doi.org/10.1145/3746058.3758454",
                                  icon: "paper",
                                },
                                children: [{ text: "paper" }],
                              },
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://github.com/Zeta611/redemon-ui",
                                  icon: "github",
                                },
                                children: [{ text: "github" }],
                              },
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://redemon-ui.vercel.app/",
                                  icon: "link",
                                },
                                children: [{ text: "live" }],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        name: "VStack",
                        attrs: { gap: 1 },
                        children: [
                          {
                            name: "Text",
                            attrs: {},
                            children: [
                              {
                                text: "PLDI 2025 SRC — Retargeting an Abstract Interpreter for a New Language by Partial Evaluation (2nd place 🥈)",
                              },
                            ],
                          },
                          {
                            name: "HStack",
                            attrs: { gap: 2 },
                            children: [
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://doi.org/10.48550/arXiv.2507.04316",
                                  icon: "paper",
                                },
                                children: [{ text: "paper" }],
                              },
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://www.youtube.com/live/BRhBv_aYNks?t=5750",
                                  icon: "video",
                                },
                                children: [{ text: "video" }],
                              },
                              {
                                name: "Link",
                                attrs: {
                                  href: "https://pldi25.sigplan.org/details/pldi-2025-src/1/",
                                  icon: "link",
                                },
                                children: [{ text: "event" }],
                              },
                            ],
                          },
                        ],
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
                        text: "Oct 2025 — UIST 2025 Best Poster Honorable Mention Award 🏅",
                      },
                      {
                        text: "Aug 2025 — SIGPL Summer School 2025 Presentation Award (1st place 🥇)",
                      },
                      {
                        text: "Jun 2025 — PLDI 2025 SRC Graduate Category (2nd place 🥈)",
                      },
                      {
                        text: "Sep 2024 — Outstanding Teaching Assistant Award (SNU Engineering)",
                      },
                      {
                        text: "Aug 2024 — SIGPL Summer School 2024 Presentation Award (2nd place 🥈)",
                      },
                      {
                        text: "Mar 2018–Feb 2024 — Presidential Science Scholarship (Korea Student Aid Foundation)",
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
  education: {
    description: "Show education entries",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "VStack",
            attrs: { gap: 2 },
            children: [
              {
                name: "Heading",
                attrs: { level: 3 },
                children: [{ text: "Education" }],
              },
              {
                name: "List",
                attrs: {},
                children: [
                  {
                    name: "VStack",
                    attrs: { gap: 0 },
                    children: [
                      {
                        name: "Text",
                        attrs: { weight: "semibold" },
                        children: [
                          {
                            text: "Seoul National University (SNU) — M.S. in CSE",
                          },
                        ],
                      },
                      {
                        name: "Text",
                        attrs: { variant: "muted", size: "sm" },
                        children: [{ text: "Mar 2024–Present" }],
                      },
                      {
                        name: "Text",
                        attrs: { size: "sm" },
                        children: [{ text: "Advised by Kwangkeun Yi." }],
                      },
                    ],
                  },
                  {
                    name: "VStack",
                    attrs: { gap: 0 },
                    children: [
                      {
                        name: "Text",
                        attrs: { weight: "semibold" },
                        children: [
                          {
                            text: "Seoul National University (SNU) — B.S. in ECE (cum laude)",
                          },
                        ],
                      },
                      {
                        name: "Text",
                        attrs: { variant: "muted", size: "sm" },
                        children: [{ text: "Mar 2018–Feb 2024" }],
                      },
                      {
                        name: "Text",
                        attrs: { size: "sm" },
                        children: [
                          {
                            text: "Advised by Yoonchan Jeong. Leave of absence 2020–2021 (military).",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "VStack",
                    attrs: { gap: 0 },
                    children: [
                      {
                        name: "Text",
                        attrs: { weight: "semibold" },
                        children: [
                          {
                            text: "Korea Science Academy of KAIST (KSA) — High school for gifted students",
                          },
                        ],
                      },
                      {
                        name: "Text",
                        attrs: { variant: "muted", size: "sm" },
                        children: [{ text: "Mar 2015–Feb 2018" }],
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
  research: {
    description: "Show selected research",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "VStack",
            attrs: { gap: 2 },
            children: [
              {
                name: "Heading",
                attrs: { level: 3 },
                children: [{ text: "Selected Research" }],
              },
              {
                name: "VStack",
                attrs: { gap: 3 },
                children: [
                  {
                    name: "VStack",
                    attrs: { gap: 1 },
                    children: [
                      {
                        name: "Text",
                        attrs: { weight: "semibold" },
                        children: [
                          {
                            text: "OOPSLA 2025 — React‑tRace: A Semantics for Understanding React Hooks",
                          },
                        ],
                      },
                      {
                        name: "Text",
                        attrs: { size: "sm" },
                        children: [
                          {
                            text: "Authors: Jay Lee (underlined in CV), Joongwon Ahn, Kwangkeun Yi. Accepted.",
                          },
                        ],
                      },
                      {
                        name: "HStack",
                        attrs: { gap: 2 },
                        children: [
                          {
                            name: "Link",
                            attrs: {
                              href: "https://doi.org/10.1145/3763067",
                              icon: "paper",
                            },
                            children: [{ text: "paper" }],
                          },
                          {
                            name: "Link",
                            attrs: {
                              href: "https://github.com/Zeta611/react-trace",
                              icon: "github",
                            },
                            children: [{ text: "github" }],
                          },
                          {
                            name: "Link",
                            attrs: {
                              href: "https://2025.splashcon.org/details/OOPSLA/54/",
                              icon: "link",
                            },
                            children: [{ text: "event" }],
                          },
                          {
                            name: "Link",
                            attrs: {
                              href: "https://react-trace.vercel.app/",
                              icon: "link",
                            },
                            children: [{ text: "live" }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "VStack",
                    attrs: { gap: 1 },
                    children: [
                      {
                        name: "Text",
                        attrs: { weight: "semibold" },
                        children: [
                          {
                            text: "UIST 2025 Posters — ReDemon UI: Reactive Synthesis by Demonstration for Web UI",
                          },
                        ],
                      },
                      {
                        name: "Text",
                        attrs: { size: "sm" },
                        children: [
                          {
                            text: "Authors: Jay Lee, Gyuhyeok Oh, Joongwon Ahn, Xiaokang Qiu. Accepted.",
                          },
                        ],
                      },
                      {
                        name: "HStack",
                        attrs: { gap: 2 },
                        children: [
                          {
                            name: "Link",
                            attrs: {
                              href: "https://doi.org/10.1145/3746058.3758454",
                              icon: "paper",
                            },
                            children: [{ text: "paper" }],
                          },
                          {
                            name: "Link",
                            attrs: {
                              href: "https://github.com/Zeta611/redemon-ui",
                              icon: "github",
                            },
                            children: [{ text: "github" }],
                          },
                          {
                            name: "Link",
                            attrs: {
                              href: "https://redemon-ui.vercel.app/",
                              icon: "link",
                            },
                            children: [{ text: "live" }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "VStack",
                    attrs: { gap: 1 },
                    children: [
                      {
                        name: "Text",
                        attrs: { weight: "semibold" },
                        children: [
                          {
                            text: "PLDI 2025 SRC — Retargeting an Abstract Interpreter for a New Language by Partial Evaluation",
                          },
                        ],
                      },
                      {
                        name: "Text",
                        attrs: { size: "sm" },
                        children: [
                          {
                            text: "Authors: Jay Lee. Awarded 2nd place (graduate).",
                          },
                        ],
                      },
                      {
                        name: "HStack",
                        attrs: { gap: 2 },
                        children: [
                          {
                            name: "Link",
                            attrs: {
                              href: "https://doi.org/10.48550/arXiv.2507.04316",
                              icon: "paper",
                            },
                            children: [{ text: "paper" }],
                          },
                          {
                            name: "Link",
                            attrs: {
                              href: "https://www.youtube.com/live/BRhBv_aYNks?t=5750",
                              icon: "video",
                            },
                            children: [{ text: "video" }],
                          },
                          {
                            name: "Link",
                            attrs: {
                              href: "https://pldi25.sigplan.org/details/pldi-2025-src/1/",
                              icon: "link",
                            },
                            children: [{ text: "event" }],
                          },
                        ],
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
  honors: {
    description: "Show selected honors",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "VStack",
            attrs: { gap: 2 },
            children: [
              {
                name: "Heading",
                attrs: { level: 3 },
                children: [{ text: "Selected Honors" }],
              },
              {
                name: "List",
                attrs: {},
                children: [
                  {
                    text: "Aug 2025 — SIGPL Summer School 2025 Presentation Award (1st place 🥇)",
                  },
                  {
                    text: "Jun 2025 — PLDI 2025 SRC Graduate Category (2nd place 🥈)",
                  },
                  {
                    text: "Sep 2024 — Outstanding Teaching Assistant Award (SNU Engineering)",
                  },
                  {
                    text: "Aug 2024 — SIGPL Summer School 2024 Presentation Award (2nd place 🥈)",
                  },
                  {
                    text: "Mar 2018–Feb 2024 — Presidential Science Scholarship (Korea Student Aid Foundation)",
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  },
  teaching: {
    description: "Show teaching entries",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "VStack",
            attrs: { gap: 2 },
            children: [
              {
                name: "Heading",
                attrs: { level: 3 },
                children: [{ text: "Teaching" }],
              },
              {
                name: "List",
                attrs: {},
                children: [
                  {
                    text: "Spring 2025 — SNU 4190.664A Program Analysis (Outstanding TA nominated)",
                  },
                  { text: "Spring 2025 — SNU 4190.310 Programming Languages" },
                  {
                    text: "Fall 2024 — SNU 4190.209 Computer Engineering Seminar",
                  },
                  {
                    text: "Spring 2024 — SNU 4190.310 Programming Languages (Outstanding Teaching Assistant Award)",
                  },
                  {
                    text: "Spring 2022 — SNU 4190.310 Programming Languages (Undergraduate TA)",
                  },
                ],
              },
              {
                name: "Heading",
                attrs: { level: 3 },
                children: [{ text: "Tutoring" }],
              },
              {
                name: "List",
                attrs: {},
                children: [
                  {
                    text: "Fall 2024 — SNU SPLIT Basic Programming Tutoring (Python tutor)",
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  },
  languages: {
    description: "Show natural languages",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "Heading",
            attrs: { level: 3 },
            children: [{ text: "Natural Languages" }],
          },
          {
            name: "List",
            attrs: {},
            children: [
              { text: "Korean/한국어 (native, 1999)" },
              { text: "English (fluent, 2006)" },
              { text: "Spanish/Español (elementary, 2022)" },
            ],
          },
        ],
      };
    },
  },
  programming: {
    description: "Show programming languages",
    handler: () => {
      return {
        name: "Card",
        attrs: {},
        children: [
          {
            name: "Heading",
            attrs: { level: 3 },
            children: [{ text: "Programming Languages" }],
          },
          {
            name: "Text",
            attrs: {},
            children: [
              {
                text: "C (2012), Python (2013), C++ (2016), TeX (2016), Swift (2018), TikZ (2018), OCaml (2019), λ calculus (2019), LaTeX3/expl3 (2019), Asymptote (2020), Scheme (2020), AWK (2020), JavaScript (2020), Lua (2021), CWEB (2021), Yacc (2021), ReScript (2022), React (2022), Rocq/Coq (2023), Rust (2023), TypeScript (2023), Typst (2024), Penrose (2024), Nix (2024), Lean (2025).",
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
