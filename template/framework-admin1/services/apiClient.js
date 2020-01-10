let client

export function setClient(newClient) {
  client = newClient
}

// Request helpers
const reqMethods = [
  'request',
  'delete',
  'get',
  'head',
  'options', // url, config
  'post',
  'put',
  'patch', // url, data, config
  '$get',
  '$put',
  '$delete',
  '$post',
]

const service = {}

reqMethods.forEach(method => {
  service[method] = (...rest) => {
    if (!client) throw new Error('apiClient not installed')
    return client[method].apply(null, rest)
  }
})
export const GET = service.get
export const POST = service.post
export const DELETE = service.delete
export const PUT = service.put

export default service
