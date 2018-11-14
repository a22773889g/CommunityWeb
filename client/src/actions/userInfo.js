export const userInfo = (payload) => ({
  type: 'USER_INFO',
  account: payload.account,
  name: payload.name,
  avatar: payload.avatar,
  introduction: payload.introduction,
})
