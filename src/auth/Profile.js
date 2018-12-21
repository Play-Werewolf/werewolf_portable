export const getNickname = () => {
    return localStorage.getItem("werewolf__nickname") || "";
};

export const setNickname = (nickname) => {
    localStorage.setItem("werewolf__nickname", nickname);
};