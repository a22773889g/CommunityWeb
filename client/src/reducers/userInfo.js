export default (state = {}, action) => {
  switch (action.type) {

  case 'USER_INFO':
    return { 
      ...state,
      account: action.account,
      name: action.name,
      avatar: action.avatar,
      introduction: action.introduction
    }

  default:
    return state
  }
}

