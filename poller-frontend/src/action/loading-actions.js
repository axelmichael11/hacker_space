export const loadingOn = () => {
    return {
      type: 'loading_on',
      payload: true,
    }
  }

    export const loadingOff = () => {
    return {
        type: 'loading_off',
        payload: false,
        }
    }