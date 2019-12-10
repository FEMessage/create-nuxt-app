#!/bin/sh
if [ "$TRAVIS_BRANCH" != "dev" ]
then
  echo "do not run lhci cause not on dev branch"
  exit 0
fi

yarn global add @lhci/cli

lhci autorun --upload.target=temporary-public-storage --collect.staticDistDir=./dist --collect.url=http://localhost/nuxt-element-dashboard --collect.url=http://localhost/nuxt-multiple-spa --collect.url=http://localhost/nuxt-vant
