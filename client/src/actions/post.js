export const addPost = (payload) => ({
    type: "ADD_POST",
<<<<<<< HEAD
    id: payload.id,
    content: payload.content,
    author: payload.author,
    avatar: payload.avatar,
    like: payload.like,
    PostDate: payload.date,
    lastModify: payload.date,
    comments: payload.comments,
    image: payload.image,
    tag: payload.tag
=======
    account: payload.account,
    author: payload.author,
    avatar: payload.avatar,
    content: payload.content,
    like: payload.like,
    image: payload.image,
    comments: payload.comments,
    lastModify: payload.date,
    PostDate: payload.date,
>>>>>>> develop
})
