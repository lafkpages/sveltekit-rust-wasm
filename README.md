# SvelteKit + Rust + WebAssembly template

This is a template for using Rust and WebAssembly in a SvelteKit project.

## Usage

You'll need Node.js, PNPM, Rust, and all of the other tools listed in the
[Rust Wasm book](https://rustwasm.github.io/docs/book/game-of-life/setup.html).

Then, setup the project and install dependencies:

```sh
pnpm run setup
```

Then, run the dev server:

```sh
pnpm dev
```

Once you've run the dev server once and the Wasm files are generated, you
can also optionally generate the types for the Wasm library (`$lib/wasm`):

```sh
pnpm build:types
```

### Building

To build for production, run:

```sh
pnpm build
```

This will use the `@sveltejs/adapter-node` if building on Replit, otherwise it
will use `@sveltejs/adapter-auto`. To force it to use the Node adapter, run:

```sh
ADAPTER=node pnpm build
```
