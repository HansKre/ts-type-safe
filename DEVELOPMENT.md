# Development Notes

## Publishing to NPM

```sh
npm install
# make code changes
# commit & push code
# bump lib-version in package.json
npm version patch #patch|minor|major
npm login
# npm run build <-- not needed if prepare-script exists and does that
npm publish
```

## Install jest with TypeScript

[Source](https://jestjs.io/docs/getting-started)

```sh
# install jest
npm install --save-dev jest @types/jest ts-jest
# generate basic config file using ts-jest preset to transpile TypeScript
npx ts-jest config:init
```
