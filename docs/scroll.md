# 实现统一的滚动条

本模板使用 element 中的 `el-scrollbar` 组件实现滚动条统一。由于这个组件 element 没有作为一个基础组件开放给大家使用。所以一些使用的细节只有 element 的维护者才知道。

| 属性名    | 类型    | 默认值 | 说明                                                    |
| --------- | ------- | ------ | ------------------------------------------------------- |
| native    | Boolean | false  | 是否使用原生的滚动条                                    |
| wrapStyle | -       | -      | 滚动容器的样式类                                        |
| wrapClass | -       | -      | 滚动容器的样式                                          |
| viewClass | -       | -      | 滚动视图的样式类                                        |
| viewStyle | -       | -      | 滚动视图的样式                                          |
| noresize  | Boolean | false  | 如果 container 尺寸不会发生变化，最好设置它可以优化性能 |
| tag       | String  | div    | 使用什么标签来渲染滚动视图                              |

使用时，需要给 `el-scrollbar` 的根元素一个确定的宽高，如果不希望横向滚动条一直出现，需要将 `.el-scrollbar__wrap` 设置为 `overflow-x: auto;`

```html
<el-scrollbar class="srollbar">
  ...content
</el-scrollbar>

<style>
  .scrollbar {
    height: 100%;
  }

  .scrollbar .el-scrollbar__wrap {
    height: 100%;
    overflow-x: auto;
  }
</style>
```
