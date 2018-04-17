export default (state = false, { type, payload }) => {
    switch (type) {
    case 'STORAGELOGINATTEMPT':
      return payload
    default:
      return state
    }
  }