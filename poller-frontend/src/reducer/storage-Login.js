export default (state = null, { type, payload }) => {
    switch (type) {
    case 'STORAGELOGINATTEMPT':
      return payload
    default:
      return state
    }
  }