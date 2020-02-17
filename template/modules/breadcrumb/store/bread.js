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
  async generateBreadcrumb({commit, dispatch}, route) {
    const {path: routePath, name, meta} = route

    const setBreads = async breadcrumb => {
      const paths = routePath.split('/')
      const allPromise = breadcrumb.map(async (item, index) => {
        const path = paths.slice(0, index + 2).join('/')
        const matchComps = this.$router.getMatchedComponents(path)
        let to = ''

        if (item.action) {
          const name = await dispatch(item.action, route)
          item.name = name || ''
        }

        if (!item.disabled && matchComps.length) {
          to = path
        }

        return {name: item.name, to}
      })

      const breads = await Promise.all(allPromise)
      commit('setBreads', breads)
    }

    if (meta && meta.breadcrumb) {
      setBreads(meta.breadcrumb)
    } else {
      const found = breadData.find(item => item.name === name)

      if (found) {
        setBreads(found.breadcrumb)
      }
    }
  },
  async getAccountTypeInfo(_, route) {
    const id = route.params.id
    const result = await this.$axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    )

    return result.data.name
  },
  async getUserTypeInfo(_, route) {
    const id = route.params.uid
    const result = await this.$axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    )

    return result.data.name
  },
}
