export default (state = false, { type, payload }) => {
    switch (type) {
    case 'loading_on':
      return payload
    case 'loading_off':
      return payload
    default:
      return state
    }
  }