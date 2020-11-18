// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import Vue, {VNode} from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [element: string]: any
    }
  }
}
