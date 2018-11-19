export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [{
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
            }, ...state];
        case 'LIKE_ARTICLE':
            [...state].map((i) => {
                if (i.id === action.id) {
                    return Object.assign(i, {
                        like: like + 1
                    })
                } else {
                    return i
                }
        })
        case 'EDIT_ARTICLE':
            [...state].map((i) => {
                if (i._id === action._id) {
                    return Object.assign(i, {
                        content: action.content,
                        lastModify: action.lastModify
                    })
                } else {
                    return i
                }
        })
        default:
            return state
    }
}