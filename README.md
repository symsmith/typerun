# TypeRun

> _Types, at runtime._

**TypeRun** is a fast, lightweight, DX-focused, fully tested, dependency-free validation library that works everywhere JS can run. It allows you to define data schemas, then validate these against unknown data, and infer TypeScript types from them.

```ts
import { is } from "typerun";
import { object, number, string, array, Infer } from "typerun/schema";

const postSchema = object({
  id: number,
  title: string,
  tags: array(string),
});

type Post = Infer<typeof postSchema>;

const post = {
  id: 1,
  title: "Hello, world!",
  tags: ["dev", "blog"],
};

function getPostTitle(post: Post) {
  return post.title;
}

if (is(postSchema)(post)) {
  console.log(getPostTitle(post)); // "Hello, world!"
}
```

## Get started

Install TypeRun from npm using your project’s package manager.

```sh
pnpm add typerun
npm install typerun
bun install typerun
yarn add typerun
deno install npm:typerun
```

Then, define a schema (= a type) for a resource, using TypeRun’s straightforward syntax.

```ts
import { object, number, string, optional, either, value } from "typerun/schema";

const userSchema = object({
  id: number,
  email: string,
  name: optional(string),
  role: either(value("admin"), value("user")),
});
```

Schemas can be the single source of truth for your data types, using the `Infer` utility type:

```ts
import { Infer } from "typerun/schema";

type User = Infer<typeof userSchema>;
/*    ^? type User = {
           id: number;
           email: string;
           name: string | undefined;
           role: "admin" | "user";
         }
*/
```

You can then validate some unknown data to be of the correct type, in a safe, non-throwing way:

```ts
import { validate } from "typerun";

const unknownData: unknown = await fetchUser(42);
const userResult = validate(userSchema)(unknownData);

if (isOk(userResult)) {
  console.log(userResult.email);
} else {
  console.error(userResult.errors);
}
```

You can also do it with a throwing function:

```ts
import { validate } from "typerun";

const unknownData: unknown = await fetchUser(42);
try {
  const user = validate(userSchema, { throwing: true })(unknownData);
  console.log(user.email);
} catch (errors) {
  console.error(errors);
}
```

## Exported entrypoints

The `typerun` package exports 4 entrypoints, namely:

- [`typerun`](https://typerun.js.org/modules): Validation functions
- [`typerun/parse`](https://typerun.js.org/modules/parse): JSON-parsing helper
- [`typerun/schema`](https://typerun.js.org/modules/schema): Schema definition functions
- [`typerun/result`](https://typerun.js.org/modules/result): The `Result` type, and utility functions to handle it.
