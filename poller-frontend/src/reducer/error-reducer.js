export default (state = false, { type, payload }) => {
    switch (type) {
    case 'error_on':
      return payload
    case 'error_off':
      return payload
    default:
      return state
    }
  }