## TypeScript FAQ

## 库类型声明文件

### FEMessage 组件库声明文件

相关文档在这里：[《组件库类型声明文件组织方案》](https://deepexi.yuque.com/docs/share/7e3cb6ce-be53-489b-937a-42538c5d3383)。

FEMessage 下的组件库都有类型声明文件，只需要这样引入：

```typescript
// 也可以尝试直接输入 ElForm... ，说不定能直接自动引入哦
import {ElFormRendererType} from '@femessage/el-form-renderer'

// 这样就能得到友好的编辑器提示
;(this.$refs.form as ElFormRendererType).validate(async valid => {
  // doSomething
})

// 当然也可以使用 any 大法，不过不推荐使用
;(this.$refs.form as any).validate(async valid => {
  // doSomething
})
```

对于其他组件，导出的类型名字都是以组件名 + Type 命名。

由于部分组件类型依赖 @femessage/types，可能需要安装此依赖才能正常使用：

```bash
yarn add -D @femessage/types
```

### 外部库类型声明文件

如果是外部类库，且官方没有提供类型声明文件，同时在 [@types/](https://www.typescriptlang.org/dt/search?search=) 下也没有，这种情况就需要自己编写类型声明文件了。

#### 引入报错

举个例子，如果引入一个没有提供类型声明文件的库/组件，就会看到类似这样的报错：

> Could not find a declaration file for module 'xxx'. 'xxx/node_modules/xxx/dist/index.js' implicitly has an 'any' type...

虽然上面的报错不会影响运行，只是告诉我们它找不到对应的类型，隐式地转成 any，但用起来实在难受...

那么我们就需要在 `types` 目录下新增一个 .d.ts 文件，写如下代码：

```typescript
// xxx => 引入库的包名 e.g. @femessage/excel-it
declare module 'xxx' {
  // 如果这是一个通过解构导入的方法库，你还要声明属性类型，比如：
  // export const importExcel: (ignore?: string[], callback: (any) => any) => any
}
```

#### Nuxt 上下文属性类型

如果某个类库提供了类型文件，但没有自动引入，那么需要在 types 下手动引入它，以 Sentry 为例：

```typescript
import '@nuxtjs/sentry/types'
```

而如果不得不为了某些在 Vue 实例下通过 this.xxx 访问的属性编写类型，以 OneSignal 为例：

```typescript
import Vue from 'vue'

// add type to Vue context
declare module 'vue/types/vue' {
  interface Vue {
    readonly $OneSignal: any
  }
}

// App Context and NuxtAppOptions
declare module '@nuxt/types' {
  interface Context {
    readonly $OneSignal: any
  }

  interface NuxtAppOptions {
    readonly $OneSignal: any
  }

  interface NuxtOptions {
    OneSignal?: any
  }
}

// add types for Vuex Store
declare module 'vuex/types' {
  interface Store<S> {
    readonly $OneSignal: any
  }
}
```

## 支持 JSX/TSX

如果要在组件中使用 JSX，需要把 lang="ts" 改成 lang="tsx"（同理，也只能在 .tsx 文件里使用 JSX

```diff
- <script lang="ts">
+ <script lang="tsx">
```

这样就能正常处理 JSX 了。

但是！还是会有一个问题，举个例子：

```typescript
formatter: (row: Feedback) => (
  <StatusSelector
    value={row.status}
    // 下面这行代码会报错
    onChange={(status: Status) => self.onChangeStatus(row, status)}
  />
)
```

报的错类似是这样的：

> No overload matches this call.
> Overload 1 of 3, '(options?: ThisTypedComponentOptionsWithArrayProps<{...
> Property 'onChange' does not exist on type 'ThisTypedComponentOptionsWithArrayProps<{

### 原因

表面上好像只有当属性存在驼峰命名时才会报这个错，但其实终极原因是：**在 JSX 中无法正常支持 Vue 组件，也即无法识别该组件所具有哪些属性，导致报这个属性不存在。**
**
关于这个问题的讨论可以看：[https://github.com/vuejs/vue-cli/issues/2417](https://github.com/vuejs/vue-cli/issues/2417)


### 解决方案

经过一番探索，该问题有三个解决方案：

1. ts-ingore：直接让 ts 忽略检查
1. 驼峰到中划线：让它不要报错
1. vue-tsx-support：从根源上解决问题

#### 1. ts-ingore

简单来说就是让 ts 忽略下来这行的类型检查，好处就是方便快捷。

```diff
formatter: (row: Feedback) => (
		<StatusSelector
			value={row.status}
+  		// @ts-ignore
			onChange={(status: Status) => self.onChangeStatus(row, status)}
		/>
)
```

#### 2. 驼峰改为中划线

这种方式也更符合 vue template 的风格，没有 @ts-ignore 这样粗暴，也不需要像 vue-tsx-support 这么麻烦，推荐使用这种方式。

```diff
formatter: (row: Feedback) => (
		<StatusSelector
			value={row.status}
-			onChange={(status: Status) => self.onChangeStatus(row, status)}
+			on-change={(status: Status) => self.onChangeStatus(row, status)}
		/>
)
```

注：如果这种方法不奏效，建议直接使用 ts-ingore

#### 3. vue-tsx-support

如果想从根源解决，就用这种方式，在社区逛了一圈，发现大家用的都是 [vue-tsx-support](https://github.com/wonderful-panda/vue-tsx-support) 这个插件（个人维护）。

我给它的一句话介绍就是：**可以在 JSX 中为 Tag/Component 提供属性类型检查。**

下面介绍一下如何在项目中使用，以及其中的坑。

##### 1. 安装和引入

安装

```bash
yarn add -D vue-tsx-support
```

修改 tsconfig.json

```diff
{
   "jsx": "preserve",
+  "jsxFactory": "VueTsxSupport",
}
```

引入类型

```typescript
// src/types/tsx-shim.d.ts
import 'vue-tsx-support/enable-check'
```

截止书写本文时间，最新版本为：v3.0.2，这个版本存在一些问题，下面会说。

##### 2. 使用

像上面的例子，我们要做的就是为 `StatusSelector` 这个组件编写类型，以便可以在 JSX 中识别。

编写的方式分为两种：

1. 不修改原组件（适用于第三方组件
1. 直接修改原组件（适用于项目内的组件

###### 不修改原组件，大概就是这样：

```typescript
import StatusSelectorOrig from '@/components/feedback/status-selector.vue'

import * as tsx from 'vue-tsx-support'
import {Status} from '~/constant/feedback'

type StatusSelectorProps = {
  value: Status
  readonly?: boolean
}

type StatusSelectorEvent = {
  onChange: (status: Status) => void
}

export default tsx
  .ofType<StatusSelectorProps, StatusSelectorEvent>()
  .convert(StatusSelectorOrig)
```

直接修改原组件，大概就是这样：

```typescript
import * as tsx from 'vue-tsx-support'

import {Status, statusNameMap, statusOptions} from '@/constant/feedback'

// 如果有自定义事件
type StatusSelectorEvents = {
  onChange: (status: Status) => void
}

// 主要是这里，Vue.extend 替换为 tsx.componentFactoryOf().create
export default tsx.componentFactoryOf<StatusSelectorEvents>().create({
  name: 'StatusSelector',

  props: {
    value: {
      type: String as () => Status,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  } as const,

  /**
   * 这就是上面说的坑，data 必须以这种方式使用，否则会报错
   * 该问题截止到 v3.0.2 仍未修复，已提 issue：
   * @see https://github.com/wonderful-panda/vue-tsx-support/issues/72
   */
  data: () => ({
    statusValue: '' as Status,
    statusNameMap,
    statusOptions,
  }),

  computed: {
    status(): string {
      return statusNameMap[this.statusValue as Status]
    },
  },

  watch: {
    value: {
      handler(id: Status) {
        this.statusValue = id
      },
      immediate: true,
    },
  },

  methods: {
    onChange(value: Status) {
      this.statusValue = value
      this.$emit('input:value', value)
      // this.$emit('change', value)
      // 相当于 $emit，但是可以静态检查
      tsx.emitOn(this, 'onChange', value)
    },
  },
})
```

好了，为组件编写完类型，就可以愉快地使用了，出了提供类型检查以外，还有编辑器提示哦！

### 因在 JSX 使用自定义指令导致 ESLint 报错

在项目中有这么一段代码：

```jsx
<v-img v-img-preview:data-uncropped-src src={imgUrl} />
```

结果 `v-img-preview` 指令这行在 eslint 中报错了： `Parsing error: Identifier expected`
但这个是正常的语法，而且只会在 JSX 的情况下才会报这个错，初步判断是 eslint 的问题，于是多番修改 eslint 配置后无果，于是换个思路：换个写法。

经网上一番搜寻，发现我们可以通过以下的方式代替这种写法，且 eslint 运行正常：

```jsx
 const directives = [
   {
     name: 'img-preview',
     arg: 'data-uncropped-src'
   }
 ]

 <v-img {...{directives}} src={imgUrl} />
```

关于更多可以看这里：[链接](https://github.com/vuejs/babel-plugin-transform-vue-jsx#vue-directives)

### 无法正常识别 \$store/$routers 等外部库的类型

如果编辑器出现以下报错：

> Property '\$xxx' does not exist on type 'CombinedVueInstance<Vue...

请检查是否 `tsconfig.json` 中的 `baseUrl` 是否填写正常。

### this 类型推导问题

举个例子：

```typescript
export default Vue.extend({
  data() {
    // 一个标配的 el-data-table 配置
    tableConfig: {
      extraButtons: [
        {
            text: '查看',
            atClick: (row: Feedback) => {
              this.visible = true // Property 'visible' does not exist on type 'Readonly<Record<never, any>> & Vue'.

              return Promise.resolve(false)
            },
          },
        ],
    }
  }
})
```

这是因为 this 的类型推导错误的原因造成的，解决方案有 2 个：

1. any 大法
2. composition api 真香！
