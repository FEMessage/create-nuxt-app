/**
 * @see https://github.com/FEMessage/create-nuxt-app/blob/dev/docs/api.md
 */

import modules from '~/services'
import {parseServices} from '~/utils'

export default (ctx, inject) => {
  const services = parseServices(modules, ctx.$axios)

  inject('services', services)
}
