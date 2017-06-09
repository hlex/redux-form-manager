const isEmpty = (value) => {
  if (!value || value === null || value === '' || value.length === 0) return true
  return false
}

export default isEmpty
