# TypeRun

> _Types, at runtime._

**TypeRun** is a fast, lightweight, DX-focused, dependency-free validation library that works everywhere JS can run. It allows you to define schemas against which you can validate unknown data, and infer TypeScript types from those schemas.

```ts
import { is } from "typerun";
import { object, number, string, array, Infer } from "typerun/schema";

const postSchema = object({
  id: number,
  title: string,
  tags: array(string),
  text: string,
});

type Post = Infer<typeof postSchema>;

const post = {
  id: 1,
  title: "Hello, world!",
  tags: ["dev", "blog"],
  text: "This is a post.",
};

function getPostTitle(post: Post) {
  return post.title;
}

if (is(postSchema)(post)) {
  console.log(getPostTitle(post)); // "Hello, world!"
}
```
