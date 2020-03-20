export const changeDocView = (index, title, frbsColl) => {
    return {
        type: "docView",
        payload: { index: index, title: title, frbsColl: frbsColl }
    };
}

export const changeFieldView = (index, id) => {
    return {
      type: "fieldView",
      payload: { index: index, id: id }
    };
}

export const fieldRaw = (isRaw) => {
    return {
      type: "raw",
      payload: { isRaw: isRaw }
    };
}
