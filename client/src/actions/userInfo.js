export const userInfo = (payload) => ({
  type: 'USER_INFO',
  userid: payload.userid,
  account: payload.account,
  name: payload.name,
  avatar: payload.avatar,
  introduction: payload.introduction,
})
