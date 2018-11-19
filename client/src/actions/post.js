export const addPost = (payload) => ({
    type: "ADD_POST",
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
})
