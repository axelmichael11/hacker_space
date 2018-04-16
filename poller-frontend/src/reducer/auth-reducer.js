export default (state = false, { type, payload }) => {
    switch (type) {
    case 'LOGIN':
    console.log('hitting the login reducer')
      return payload
    case 'LOGOUT':
      return null
    default:
      return state
    }
  }