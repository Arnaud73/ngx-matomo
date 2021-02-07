#!/bin/bash

npm ci
npm run lint
npm run build ngx-matomo
npm run test-headless ngx-matomo

npm login --scope=@leonmydla --registry=https://npm.pkg.github.com/leonmydla

cd dist/ngx-matomo
npm publish
