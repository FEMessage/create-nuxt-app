// https://stackoverflow.com/a/22482737
function isObject(obj) {
  return obj === Object(obj)
}

/**
 * 相同字段必须是相同类型，否则一律覆盖合并
 * 数组 concat 合并
 * 对象递归
 * 其他类型覆盖合并
 */
function mergeJson(j1, j2) {
  Object.keys(j1).forEach(k => {
    if (Array.isArray(j1[k]) && Array.isArray(j2[k])) {
      j1[k].push(...j2[k])
      delete j2[k]
    } else if (isObject(j1[k]) && isObject(j2[k])) {
      j1[k] = mergeJson(j1[k], j2[k])
      delete j2[k]
    }
  })
  return {...j1, ...j2}
}

/**
 * 原地按 key 排序
 * @see https://stackoverflow.com/a/31102605
 */
function sortObj(obj) {
  const keys = Object.keys(obj).sort()
  const temp = keys.reduce((result, k) => ((result[k] = obj[k]), result), {})
  keys.forEach(k => delete obj[k])
  return Object.assign(obj, temp)
}

module.exports = {
  mergeJson,
  sortObj,
}
