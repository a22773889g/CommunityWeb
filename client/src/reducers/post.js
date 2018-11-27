export default (state = [], action) => {
	switch(action.type){
		case 'ADD_POST':
			return [{
				_id: action._id,
				account: action.account,
				author: action.author,
                avatar: action.avatar,
                content: action.content,
                like: action.like,
                image: action.image,
				comments: action.comments,
				PostDate: action.PostDate,
				lastModify: action.lastModify,
			}, ...state];

		case 'EDIT_POST':
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
			return state;
	}
}