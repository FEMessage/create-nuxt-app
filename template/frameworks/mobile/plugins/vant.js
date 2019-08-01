import Vue from 'vue'

import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Tab,
  Tabs,
  Icon,
  Row,
  Col,
  Field,
  Popup,
  RadioGroup,
  Radio,
  Toast
} from 'vant'

Vue.use(Button)
Vue.use(Cell).use(CellGroup)
Vue.use(Dialog)
Vue.use(Tab).use(Tabs)
Vue.use(Icon)
Vue.use(Row).use(Col)
Vue.use(Field)
Vue.use(Popup)
Vue.use(RadioGroup).use(Radio)

Vue.$toast = Toast
