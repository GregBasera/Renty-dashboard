const changeDocView = (state = { index:0, title:'Documents' }, action) => {
    switch(action.type) {
        case "docView":
            return action.payload;
        default:
            return state;
    }
}

export default changeDocView;
