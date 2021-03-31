#!/bin/bash

set -eu

npm ci
npm run lint
npm run build:prod
npm run test-headless ngx-matomo

cd dist/ngx-matomo
npm publish --access public
