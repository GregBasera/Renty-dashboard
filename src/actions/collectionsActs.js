export const changeDocView = (index, title) => {
    return {
        type: "docView",
        payload: { index: index, title: title }
    };
}