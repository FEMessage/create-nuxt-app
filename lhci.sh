#!/bin/sh
yarn global add @lhci/cli

lhci autorun --upload.target=temporary-public-storage --collect.staticDistDir=./dist --collect.url=http://localhost/nuxt-element-dashboard --collect.url=http://localhost/nuxt-multiple-spa --collect.url=http://localhost/nuxt-vant
