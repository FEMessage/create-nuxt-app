import Vue from 'vue'
import Element, {Notification, MessageBox, Message} from '@femessage/element-ui'
import ElFormRenderer from '@femessage/el-form-renderer'
import ElDataTable from '@femessage/el-data-table'
import IconFont from '@/components/icon-font'
import VImg from '@femessage/v-img'

Vue.use(VImg)
Vue.use(Element, {size: 'small'})
Vue.component('el-form-renderer', ElFormRenderer)
Vue.component('el-data-table', ElDataTable)
Vue.component('icon-font', IconFont)

Vue.prototype.$notify = Notification
Vue.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
/**
 * 规范版的 confirm：
 * - confirmAction 的 promise 在 pending 状态时确认按钮会 loading
 * - confirmAction resolve 或 reject 时有提示信息
 * - 用户是否取消通过 resolve 的值来判断，而不是抛出异常
 * @return {promise<boolean>} - true 表示执行了 confirm 操作；false 代表用户取消操作
 */
Vue.prototype.$$confirm = function(
  message,
  title,
  {
    confirmAction = () => {},
    successText = '操作成功',
    failText = '操作失败',
    ...rest
  },
) {
  return MessageBox.confirm(message, title, {
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action !== 'confirm') return done()
      instance.confirmButtonLoading = true
      try {
        await confirmAction()
        Message.success(successText)
      } catch {
        Message.error(failText)
      } finally {
        instance.confirmButtonLoading = false
        done()
      }
    },
    ...rest,
  }).then(
    () => true,
    err => {
      if (err === 'cancel') return false
      throw err
    },
  )
}
