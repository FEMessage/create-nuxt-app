# create-nuxt-app

[![Build Status](https://travis-ci.com/FEMessage/create-nuxt-app.svg?branch=master)](https://travis-ci.com/FEMessage/create-nuxt-app)
[![NPM Download](https://badgen.net/npm/dm/@femessage/create-nuxt-app)](https://www.npmjs.com/package/@femessage/create-nuxt-app)
[![NPM Version](https://badgen.net/npm/v/@femessage/create-nuxt-app)](https://www.npmjs.com/package/@femessage/create-nuxt-app)
[![NPM License](https://badgen.net/npm/license/@femessage/create-nuxt-app)](https://github.com/FEMessage/create-nuxt-app/blob/master/LICENSE)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome/green)](https://github.com/FEMessage/create-nuxt-app/pulls)
[![semantic-release](https://badgen.net/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80/semantic-release/e10079)](https://github.com/semantic-release/semantic-release)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Links](#links)
- [Usage](#usage)
- [Frameworks](#frameworks)
- [Developer Guide](#developer-guide)
- [Contributors](#contributors)
- [License](#license)

## Introduction

Create a Deepexi Nuxt App in seconds.

[⬆ Back to Top](#table-of-contents)

## Features

- [x] [prettier](https://prettier.io/) Prettier is an opinionated code formatter
- [x] [eslint](https://eslint.org/) A fully pluggable tool for identifying and reporting on patterns in JavaScript
- [x] [stylelint](https://stylelint.io/) A mighty, modern style linter
- [x] [commitlint](https://conventional-changelog.github.io/commitlint/) Lint commit messages
- [x] [gitlab-ci](https://about.gitlab.com/product/continuous-integration/) GitLab CI
- [x] [dotenv](https://github.com/motdotla/dotenv) Loads environment variables from .env for nodejs projects
- [x] [element-ui](https://element.eleme.io/) A Vue.js 2.0 UI Toolkit for Web
- [x] [vant](https://youzan.github.io/vant) Lightweight Mobile UI Components built on Vue

[⬆ Back to Top](#table-of-contents)

## Links

- [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)
- [nuxt-element-dashboard](https://github.com/levy9527/nuxt-element-dashboard)

[⬆ Back to Top](#table-of-contents)

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

![preview](https://i.loli.net/2019/06/24/5d108d92206de47421.gif)

</details>

<br>

[⬆ Back to Top](#table-of-contents)

## Frameworks

### Single

```bash
npx @femessage/create-nuxt-app -t single
```

![nuxt-element-dashboard](https://i.loli.net/2019/06/24/5d108e301184d60426.png)

### Multiple

```bash
npx @femessage/create-nuxt-app -t multiple
```

![nuxt-multiple-spa](https://i.loli.net/2019/06/24/5d108e300bc8e21918.png)

This is a pratice of micro-frontends

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
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/lianghx-319"><img src="https://avatars2.githubusercontent.com/u/27187946?v=4" width="100px;" alt="Han"/><br /><sub><b>Han</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=lianghx-319" title="Code">💻</a> <a href="https://github.com/FEMessage/create-nuxt-app/commits?author=lianghx-319" title="Documentation">📖</a> <a href="https://github.com/FEMessage/create-nuxt-app/commits?author=lianghx-319" title="Tests">⚠️</a> <a href="#infra-lianghx-319" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td><td align="center"><a href="https://github.com/levy9527/blog"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#review-levy9527" title="Reviewed Pull Requests">👀</a></td><td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=OuZuYu" title="Code">💻</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=evillt" title="Code">💻</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=donaldshen" title="Code">💻</a></td><td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="https://github.com/FEMessage/create-nuxt-app/commits?author=colmugx" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
