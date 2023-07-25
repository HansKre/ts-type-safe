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
