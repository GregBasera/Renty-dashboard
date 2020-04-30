const changeFieldsView = (state = { index: 0, id: null }, action) => {
    switch(action.type) {
        case "fieldView":
            return action.payload;
        default:
            return state;
    }
}

export default changeFieldsView;
