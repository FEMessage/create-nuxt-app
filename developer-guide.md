# Developer Guide

@femessage/create-nuxt-app is a framework-template scaffolding that use SAO under the hood.

Please check out [saojs.org](https://saojs.org) to know what is SAO.

## Add module (Use Jest for example)

### Add module files

Add module files to `template/frameworks`

![](https://i.loli.net/2019/08/29/vUXaQZIbLo15pxY.png)

### Add this module for framework-template

Then modify the `template.config.js` which framework-template need to use this module.

![](https://i.loli.net/2019/08/29/KNXGvEsxjymS9TU.png)

Modify the `generator/Template.js` to make this module be a default module, it will be apply to all framework-template.

![](https://i.loli.net/2019/08/29/UD2quld1icH64pv.png)

### Testing generated framework-template

Run `create-nuxt-app -t single -o release` will be generated to `workspace/release`.

Check the generated framework-template.

![](https://i.loli.net/2019/08/29/ALeOBqMcX29awFT.png)

`cd release` to enter the folder then run these following:

- yarn
- yarn build

Check is build succeed.

Check is the new feature works.

### Update Test Snapshots

If this module pass your test and feeling good, then run `yarn test:snapshot` to update the snapshots.

## Add framework-template (Use mobile for example)

### Adding a new template

Add a mobile template config in `template.config.js`

![](https://i.loli.net/2019/08/29/XrMzQBceA29kmRy.png)

Template exclusive files, organized in the standalone folder. e.g. `framework/mobile`

![](https://i.loli.net/2019/08/29/f5zn8FoBW63lmYi.png)

For reusable modules, please check out [Add module (Use Jest for example)](add-module-(use-jest-for-example))

## Case to using the same file (Powered by EJS)

Facing problem: a template using `element-ui` for desktop but another template using `vant-ui` for mobile.

Add vant-ui module:

![](https://i.loli.net/2019/08/29/rzmj9P1iElXAOyw.png)

Add `vant-ui` as a dependency to `template/_package.json`. In the same time, if I using `vant-ui` then I don't need `element-ui` any more.

![](https://i.loli.net/2019/08/29/AZw4HGka9Xmyjrq.png)

Modify the `template/nuxt/nuxt.config.js`

![](https://i.loli.net/2019/08/29/xnEosSHWl2RAkv3.png)

👋, your lovely template is ready to work with you.

## Links

- [create-nuxt-app](https://github.com/nuxt/create-nuxt-app)
- [SAO](https://saojs.org)
- [CAC](https://github.com/cacjs/cac)
