const INITIAL_STATE = {
  data: {},
  secondRequest: {},
  isLoading: false,
}

const mainReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'REQUESTING_API':
      return {
        ...state,
        isLoading: true,
      }
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'REQUEST_FAILED':
      return {
        ...state,
        secondRequest: action.payload,
        isLoading: false,
      }
    default:
      return state;
  }
}

export default mainReducer;
