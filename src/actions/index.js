export const increment = (n) => {
    return {
        type: "increment",
        payload: n
    };
}
//  default increment;

export const decrement = () => {
    return {
        type: "decrement"
    };
};