const curry = (f) => (...a) => (a.length < f.length) ? curry(f.bind(this, ...a)) : f(...a)

const clone = (obj) => Object.assign({}, obj)

const chain = (...fs) => (a) => fs.reduce((o, f) => f(o), a)

const isEmpty = (a) => !a || a === null || a === '' || Object.values(a).length === 0

const isString = (a) => (typeof a === 'string')

const isNumber = (x) => !isNaN(Number(x))

const isArray = (a) => Array.isArray(a)

const range = (size) => [...Array(size).keys()]

const keys = (o) => Object.keys(o)

const values = (o) => Object.values(o)

const fromPairs = (arr) => arr.reduce((o, el) => { o[el[0]] = el[1]; return o; }, {})

const mapValues = curry((fn, a) => Object.keys(a).reduce((o, k) => { o[k] = fn(a[k], k); return o; }, {}))

const pickBy = curry((fn, a) => Object.keys(a).reduce((o, k) => { if (fn(a[k], k)) o[k] = a[k]; return o; }, {}))

const reduce = curry((fn, k, a) => a.length ? a.reduce(fn, k) : Object.keys(a).reduce((o, i) => fn(o, a[i], i), k))

const filter = curry((fn, args) => args.length ? args.filter(fn) : pickBy(fn, args))

const map = curry((fn, args) => args.length ? args.map(fn) : mapValues(fn, args))

const fromPath = (path) => path.replace('[', '.').replace(']', '').split('.')

const get = curry((p, a) => (isArray(p) ? p : fromPath(p)).reduce((acc, o) => acc ? acc[o] : acc, a))

const set = curry((p, value, obj) => {
  const path = isArray(p) ? p : fromPath(p)
  const next = obj[path[0]] || (isNumber(path[1]) ? [] : {})
  obj[path[0]] = path.length > 1 ? set(path.slice(1), value, next) : value
  return obj
})
