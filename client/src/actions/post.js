export const addPost = (payload) => ({
    type: "ADD_POST",
    userid: payload.userid,
    account: payload.account,
    author: payload.author,
    avatar: payload.avatar,
    content: payload.content,
    like: payload.like,
    image: payload.image,
    comments: payload.comments,
    lastModify: payload.date,
    PostDate: payload.date,
})
