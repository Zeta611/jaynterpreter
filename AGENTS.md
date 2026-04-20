# Agent Instructions

- Use `bun` for package management and project commands by default.
- Prefer `bun install` when dependencies need to be installed.
- Prefer `bun run <script>` for scripts from `package.json`.
- If `bun` is not available, try entering the Nix environment first, then retry the same `bun` command.
- If no Nix environment is available or `bun` still cannot be found there, report the missing tool instead of switching package managers unless explicitly asked.
