import ErrorPage from '@/views/addition/Error'
import NoGrant from '@/views/addition/NoGrant'

export default {
  path: '/addition',
  redirect: '/addition/error',
  name:'Addition',
  meta: {
    hide: true
  },
  children: [
    {
      path: 'error',
      name:'Error',
      component: ErrorPage,
      meta: {
        name: '发生错误',
        parent: '/addition'
      }
    },
    {
      path: 'noGrant',
      name: 'NoGrant',
      component: NoGrant,
      meta: {
        name: '未授权界面',
        parent: '/addition'
      }
    }
  ]
}