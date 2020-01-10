const HOME = { name: '首页' }
const ACCOUNT = { name: '账户管理' }
const STAFF = { name: '员工管理' }

const ACCOUNT_TYPE = {
  disabled: true,
  action: 'getAccountTypeInfo',
}

const USER_TYPE = {
  disabled: true,
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
    name: "account-id",
    breadcrumb: [ACCOUNT, ACCOUNT_TYPE]
  },
  {
    name: "account-id-staff",
    breadcrumb: [ACCOUNT, ACCOUNT_TYPE, STAFF]
  },
  {
    name: "account-id-staff-uid",
    breadcrumb: [ACCOUNT, ACCOUNT_TYPE, STAFF, USER_TYPE]
  },
]
