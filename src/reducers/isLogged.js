const loggedReducer = (state = false, action) => {
    switch(action.type) {
        case "signed":
            return !state;
        default:
            return state;
    }
}

export default loggedReducer;