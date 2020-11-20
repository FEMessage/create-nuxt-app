# create-nuxt-app

[![Build Status](https://travis-ci.com/FEMessage/create-nuxt-app.svg?branch=master)](https://travis-ci.com/FEMessage/create-nuxt-app)
[![NPM Download](https://badgen.net/npm/dm/@femessage/create-nuxt-app)](https://www.npmjs.com/package/@femessage/create-nuxt-app)
[![NPM Version](https://badgen.net/npm/v/@femessage/create-nuxt-app)](https://www.npmjs.com/package/@femessage/create-nuxt-app)
[![NPM License](https://badgen.net/npm/license/@femessage/create-nuxt-app)](https://github.com/FEMessage/create-nuxt-app/blob/master/LICENSE)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome/green)](https://github.com/FEMessage/create-nuxt-app/pulls)
[![semantic-release](https://badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic-release/e10079)](https://github.com/semantic-release/semantic-release)

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Features](#features)
- [Links](#links)
- [Usage](#usage)
- [Frameworks](#frameworks)
- [Developer Guide](#developer-guide)
- [Contributors](#contributors)
- [License](#license)

## Introduction

Create an enterprise nuxt app in seconds.

[⬆ Back to Top](#table-of-contents)

## Features

- [x] [typescript](https://www.typescriptlang.org/) TypeScript extends JavaScript by adding types.
- [x] [composition-api](https://composition-api.vuejs.org/) a set of additive, function-based APIs that allow flexible composition of component logic.
- [x] [prettier](https://prettier.io/) Prettier is an opinionated code formatter
- [x] [eslint](https://eslint.org/) A fully pluggable tool for identifying and reporting on patterns in JavaScript
- [x] [stylelint](https://stylelint.io/) A mighty, modern style linter
- [x] [commitlint](https://conventional-changelog.github.io/commitlint/) Lint commit messages
- [x] [gitlab-ci](https://about.gitlab.com/product/continuous-integration/) GitLab CI
- [x] [dotenv](https://github.com/motdotla/dotenv) Loads environment variables from .env for nodejs projects
- [x] [@femessage/element-ui](http://femessage.github.io/element/) A Vue.js 2.0 UI Toolkit for Web
- [x] [@femessage/vant](http://femessage.github.io/vant/) Lightweight Mobile UI Components built on Vue
- [x] [PWA](https://pwa.nuxtjs.org) Nuxt Progressive Web Apps solution
- [x] [API Manage](https://github.com/FEMessage/create-nuxt-app/blob/dev/docs/api.md) RESTful API management
- [x] [breadcrumb](https://www.yuque.com/docs/share/2fb86219-e8be-4007-a2b8-39641d5e79df)

[⬆ Back to Top](#table-of-contents)

## Inspiration

- [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)
- [nuxt-element-dashboard](https://github.com/levy9527/nuxt-element-dashboard)

[⬆ Back to Top](#table-of-contents)

## [Demo](https://femessage.github.io/create-nuxt-app/)

### Nuxt-Admin

- tenantId admin
- account   admin
- password   abcd1234

**run local dev server**

```sh
# white a .env file in root
API_SERVER=https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b
APP_ID=1204701543597604893
```

## Links
- [TypeScript FAQ](https://deepexi.yuque.com/docs/share/ec81b0e7-b1b4-426c-a66c-8c293e7185c2)
- [Composition API Best Practices](https://deepexi.yuque.com/docs/share/54bd68ca-27bb-4db8-8b26-f2dd1de406ff)

## Usage

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since [npm](https://www.npmjs.com/get-npm) `5.2.0`)

One-off usage via npx:

```bash
npx @femessage/create-nuxt-app [my-project] -t [template]
```

Global install:

```bash
yarn global add @femessage/create-nuxt-app
```

Help text:

```bash
npx @femessage/create-nuxt-app -h

Usage:
  create-nuxt-app [options]

Options:
  -t, --template <template>  create a preset template
  -l, --list                 the list of preset template
  -a, --all                  generate all preset template
  -o, --output <output>      the output path of the generator
  -h, --help                 Display this message
  -v, --version              Display version number
```

<details><summary>Preview</summary>

![preview](https://i.loli.net/2020/02/17/B8FHNTerut53m14.gif)

</details>

<br>

[⬆ Back to Top](#table-of-contents)

## Frameworks

### Admin

```bash
npx @femessage/create-nuxt-app -t admin
```

![nuxt-admin](https://i.loli.net/2020/02/17/sMtU3kHCefAyRTN.jpg)

An PC admin template

Default account
admin
admin
abcd1234

### Mobile

```bash
npx @femessage/create-nuxt-app -t mobile
```

<img style="width: 50%" src="https://i.loli.net/2019/08/29/mTyvRhrHPWSwitK.png">

[⬆ Back to Top](#table-of-contents)

## Developer Guide

Please check out [developer guide](./developer-guide.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/lianghx-319"><img src="https://avatars2.githubusercontent.com/u/27187946?v=4" width="100px;" alt=""/><br /><sub><b>Han</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=lianghx-319" title="Code">💻</a> <a href="https://github.com/FEMessage/create-nuxt-app/commits?author=lianghx-319" title="Documentation">📖</a> <a href="https://github.com/FEMessage/create-nuxt-app/commits?author=lianghx-319" title="Tests">⚠️</a> <a href="#infra-lianghx-319" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt=""/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=donaldshen" title="Code">💻</a> <a href="https://github.com/FEMessage/create-nuxt-app/commits?author=donaldshen" title="Tests">⚠️</a> <a href="#maintenance-donaldshen" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/levy9527/blog"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt=""/><br /><sub><b>levy</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/pulls?q=is%3Apr+reviewed-by%3Alevy9527" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt=""/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=OuZuYu" title="Code">💻</a></td>
    <td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt=""/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=evillt" title="Code">💻</a> <a href="https://github.com/FEMessage/create-nuxt-app/commits?author=evillt" title="Documentation">📖</a> <a href="#tool-evillt" title="Tools">🔧</a></td>
    <td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt=""/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=colmugx" title="Code">💻</a></td>
    <td align="center"><a href="https://shoyuf.top"><img src="https://avatars3.githubusercontent.com/u/27998490?v=4" width="100px;" alt=""/><br /><sub><b>Shoyuf</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=shoyuf" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/zhn4"><img src="https://avatars2.githubusercontent.com/u/11404946?v=4" width="100px;" alt=""/><br /><sub><b>zhn4</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=zhn4" title="Code">💻</a></td>
    <td align="center"><a href="https://4ark.me"><img src="https://avatars0.githubusercontent.com/u/27952659?v=4" width="100px;" alt=""/><br /><sub><b>4Ark</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=gd4Ark" title="Code">💻</a> <a href="https://github.com/FEMessage/create-nuxt-app/issues?q=author%3Agd4Ark" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
