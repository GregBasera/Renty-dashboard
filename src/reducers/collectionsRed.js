const changeDocView = (state = { index:1, title:'Due' }, action) => {
    switch(action.type) {
        case "docView":
            return action.payload;
        default:
            return state;
    }
}

export default changeDocView;
