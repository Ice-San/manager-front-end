export const getTodayDate = () => {
    const date = new Date();
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
}