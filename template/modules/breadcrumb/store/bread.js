import breadData from '@/components/breadcrumb/bread-data'

export const state = () => ({
  breads: [],
})

export const mutations = {
  setBreads(state, breads) {
    state.breads = breads
  },
}

export const getters = {
  breads(state) {
    return state.breads.filter(item => item.name)
  },
}

export const actions = {
  async generateBreadcrumb({ commit, dispatch }, route) {
    const { path: routePath, name, meta } = route

    const commitSetBreads = async breadcrumb => {
      const paths = routePath.split('/')
      const allPromise = breadcrumb.map(async (item, index) => {
        const path = paths.slice(0, index + 2).join('/')

        if (item.action) {
          const name = await dispatch(item.action, route)
          item.name = name ? name : ''
        }

        return { name: item.name, to: item.clickable === false ? '' : path }
      })

      const breads = await Promise.all(allPromise)
      commit('setBreads', breads)
    }

    if (meta && meta.breadcrumb) {
      commitSetBreads(meta.breadcrumb)
    } else {
      const found = breadData.find(item => item.name === name)

      if (found) {
        commitSetBreads(found.breadcrumb)
      }
    }
  },
  async getAccountTypeInfo(_, route) {
    const id = route.params.id
    const result = await this.$axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

    return result.data.name
  },
  async getUserTypeInfo(_, route) {
    const id = route.params.uid
    const result = await this.$axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

    return result.data.name
  },
}
