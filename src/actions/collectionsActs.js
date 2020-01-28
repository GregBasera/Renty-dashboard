export const changeDocView = (index, title) => {
    return {
        type: "docView",
        payload: { index: index, title: title }
    };
}

export const changeFieldView = (index, string) => {
    return {
      type: "fieldView",
      payload: { index: index, string: string }
    };
}
