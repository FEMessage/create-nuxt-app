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

let componentNames = []

export const actions = {
  async generateBreadcrumb({ commit, dispatch }, route) {
    const { path: routePath, name, meta } = route
    if (!componentNames.length) {
      componentNames = this.$router.options.routes.filter(item => item.name !== 'all').map(item => item.component.name)
    }

    const commitSetBreads = async breadcrumb => {
      const paths = routePath.split('/')
      const allPromise = breadcrumb.map(async (item, index) => {
        const path = paths.slice(0, index + 2).join('/')
        const matchComps = this.$router.getMatchedComponents(path)
        let to

        if (matchComps.length) {
          const matchCompsName = matchComps[0].name
          const isNameExist = componentNames.includes(matchCompsName)

          if (isNameExist || matchCompsName === 'VueComponent') {
            to = path
          }
        }

        if (item.action) {
          const name = await dispatch(item.action, route)
          item.name = name ? name : ''
        }

        return { name: item.name, to }
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
    const result = await this.$axios.get(`https://api.github.com/users/${id}`)

    return result.data.name
  },
  async getUserTypeInfo(_, route) {
    const id = route.params.uid
    const result = await this.$axios.get(`https://api.github.com/users/${id}`)

    return result.data.name
  },
}
