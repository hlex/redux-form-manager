const includes = (collection, value) => {
  if (collection.length === 0) return false
  for (const key in value) {
    if (collection.indexOf(key)) return true
  }
  return false
}

export default includes
