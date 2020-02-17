const HOME = {name: '首页'}
const ACCOUNT = {name: '账户管理', disabled: true}
const FIELD = {name: '字段管理'}
const GROUP = {name: '群组管理'}
const ORGANNIZATION = {name: '组织管理'}
const POSITION = {name: '职位管理'}
const STAFF = {name: '员工管理'}

export default [
  {
    name: 'index',
    breadcrumb: [HOME],
  },
  {
    name: 'account-field',
    breadcrumb: [ACCOUNT, FIELD],
  },
  {
    name: 'account-group',
    breadcrumb: [ACCOUNT, GROUP],
  },
  {
    name: 'account-organization',
    breadcrumb: [ACCOUNT, ORGANNIZATION],
  },
  {
    name: 'account-position',
    breadcrumb: [ACCOUNT, POSITION],
  },
  {
    name: 'account-staff',
    breadcrumb: [ACCOUNT, STAFF],
  },
]
