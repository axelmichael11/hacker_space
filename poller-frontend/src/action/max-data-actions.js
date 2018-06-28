export const maxDataReached = () => {
    return {
      type: 'max_data_reached',
      payload: true,
    }
  }


  export const maxDataNotReached = () => {
    return {
      type: 'max_data_not_reached',
      payload: false,
    }
  }