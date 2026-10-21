# Development Notes

## Publishing to NPM

```sh
pnpm install
# make code changes
# commit & push code
# to bump lib-version in package.json, run:
pnpm version patch # patch|minor|major
npm login
# pnpm run build: not needed if prepare-script exists and does that,
# but this might update README.md and to avoid changes to README.md which have to
# be committed AFTER npm publish, you might want to run it yourself
pnpm run build
pnpm publish
```

## Jest with TypeScript

Tests run via `babel-jest` using `@babel/preset-typescript`. No separate TypeScript
compilation step is needed for tests — Babel strips types at test time.

The config lives in `babel.config.js` and is picked up automatically by Jest.

```sh
# install deps
pnpm install
# run tests
pnpm test
# watch mode
pnpm run test:w
```
