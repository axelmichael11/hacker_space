export const errorOn = () => {
    return {
      type: 'error_on',
      payload: true,
    }
  }

    export const errorOff = () => {
    return {
        type: 'error_off',
        payload: false,
        }
    }