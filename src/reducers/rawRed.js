const fieldRaw = (state = { isRaw: false }, action) => {
    switch(action.type) {
        case "raw":
            return action.payload;
        default:
            return state;
    }
}

export default fieldRaw;
