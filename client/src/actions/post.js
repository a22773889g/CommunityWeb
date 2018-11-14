export const addPost = (payload) => ({
    type: "ADD_POST",
    title: payload.title,
    content: payload.content,
    author: payload.author,
    avatar: payload.avatar,
    PostDate: payload.date,
    lastModify: payload.date,
    comments: payload.comments,
    tag: payload.tag
})
