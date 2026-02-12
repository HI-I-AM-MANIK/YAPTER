# Prisma Client import error: "Module '@prisma/client' has no exported member 'PrismaClient'"

## Summary

You may see this TypeScript error when importing PrismaClient:

```ts
import { PrismaClient } from "@prisma/client";
```

The editor shows: `Module "@prisma/client" has no exported member 'PrismaClient'` or `Cannot find module './generated/prisma' or its corresponding type declarations`.

## Root causes

1. Prisma Client was not generated yet. The TypeScript type definitions and runtime client code are produced by `prisma generate`.
2. `@prisma/client` is not installed or has been removed.
3. Custom `generator client` `output` path was set in `prisma/schema.prisma` and the import path does not match that custom output.
4. The editor/TypeScript server needs to be restarted after generation.

## Reproduction

- Project has `prisma/schema.prisma` with models and a `generator client` block.
- `lib/db.ts` imports `PrismaClient` but `npx prisma generate` was not run.

## Steps to resolve

1. Install packages (if missing):

```powershell
npm install @prisma/client prisma --save-dev
```

2. Generate the client (creates types and runtime client):

```powershell
npx prisma generate
```

3. If you used a custom output in `schema.prisma` (for example `output = "../lib/generated/prisma"`), either:

- Remove the custom `output` so you can import from `@prisma/client` (recommended), or
- Import from the generated path after verifying it exists. Example:

```ts
import { PrismaClient } from "../lib/generated/prisma"; // adjust path to your project
```

4. Verify generated files exist:

```powershell
Test-Path .\node_modules\@prisma\client\index.d.ts
# or check custom output directory
Test-Path .\lib\generated\prisma\index.d.ts
```

5. Restart TypeScript server / VS Code window if the editor still shows the error.

6. If issues persist, try a clean reinstall:

```powershell
rm -r node_modules package-lock.json
npm install
npx prisma generate
```

## Recommended `lib/db.ts` singleton pattern

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
```

## Notes

- Always run `npx prisma generate` after changing `schema.prisma`.
- Ensure `generator client` uses `provider = "prisma-client-js"` (default) so `@prisma/client` works normally.

---
This document was generated and committed to the repository to record the debugging steps and fix.