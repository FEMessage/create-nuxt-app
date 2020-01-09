const HOME = { name: '首页' }
const ACCOUNT = { name: '账户管理' }
const TEST = { name: '测试' }
const HELLO = { name: '你好' }

const ACCOUNT_TYPE = {
  name: '',
  action: 'getAccountTypeInfo',
}

const USER_TYPE = {
  name: '',
  action: 'getUserTypeInfo',
}

export default [
  {
    name: 'index',
    breadcrumb: [HOME]
  },
  {
    name: 'account',
    breadcrumb: [ACCOUNT]
  },
  {
    name: 'account-test',
    breadcrumb: [ACCOUNT, TEST]
  },
  {
    name: "account-id-hello",
    breadcrumb: [ACCOUNT, ACCOUNT_TYPE, HELLO]
  },
  {
    name: "account-id-hello-uid",
    breadcrumb: [ACCOUNT, ACCOUNT_TYPE, HELLO, USER_TYPE]
  },
]
