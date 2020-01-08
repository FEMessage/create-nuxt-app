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
    const { path, name, meta } = route

    const commitSetBreads = async breadcrumb => {
      const paths = path.split('/')
      const allPromise = breadcrumb.map(async (item, index) => {
        const path = paths.slice(0, index + 2).join('/')
        const matchComps = this.$router.getMatchedComponents(path)

        if (item.action) {
          const name = await dispatch(item.action, route)
          item.name = name ? name : ''
        }

        return {
          name: item.name,
          to: matchComps.length && path,
        }
      })

      const breads = await Promise.all(allPromise)
      commit('setBreads', breads)
    }

    if (meta && meta.breadcrumb) {
      commitSetBreads(meta.breadcrumb)
    } else {
      const finded = breadData.find(item => item.name === name)

      if (finded) {
        commitSetBreads(finded.breadcrumb)
      }
    }
  },
}
