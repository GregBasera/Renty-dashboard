const changeFieldsView = (state = { index: 0, string: 'default' }, action) => {
    switch(action.type) {
        case "fieldView":
            return action.payload;
        default:
            return state;
    }
}

export default changeFieldsView;
