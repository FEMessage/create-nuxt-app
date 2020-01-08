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
  list(state) {
    return state.breads.filter(item => item.name)
  },
}

export const actions = {
  async generateBreadcrumb({ commit, dispatch }, route) {
    const { path: routePath } = route
    const paths = routePath.split('/')
    const breadcrumbs = []

    paths.forEach(path => {
      const bread = breadData.find(item => item.path === path)
      breadcrumbs.push(bread)
    })

    const allPromise = breadcrumbs.map(async (item, index) => {
      const path = paths.slice(0, index + 2).join('/')
      const matchComps = this.$router.getMatchedComponents(path)

      if (item.action) {
        const result = await dispatch(item.action, route)
        item.name = result ? result.name : ''
      }

      return {
        name: item.name,
        to: matchComps.length && path,
      }
    })

    const breads = await Promise.all(allPromise)
    commit('setBreads', breads)
  },
}
