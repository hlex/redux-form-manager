import isArray from 'isArray'

const find = (collection, value) => {
  if (isArray(collection)) {
    // if (collection.prop && collection.prop.constructor === Array)
    for (const key of collection) {
      console.log('key of collection', collection, key)
      if (collection[key] === value) return collection[key]
    }
    return undefined
  }
  return undefined
}

export default find
