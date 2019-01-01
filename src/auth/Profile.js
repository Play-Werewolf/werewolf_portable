export const getNickname = () => {
    return localStorage.getItem("werewolf__nickname") || "";
};

export const setNickname = (nickname) => {
    localStorage.setItem("werewolf__nickname", nickname);
};

export const getAvatar = () => {
    return localStorage.getItem("werewolf__avatar") || "https://preview.bitmoji.com/avatar-builder-v3/preview/head?scale=1&gender=2&style=5&rotation=0&brow=1601&cheek_details=1355&ear=1430&eye=1610&eyelash=2280&hair=1655&jaw=1410&mouth=2341&nose=2663&blush_tone=15034986&hair_tone=6700839&hair_treatment_tone=7554610&pupil_tone=7448799&skin_tone=7292807&body=10&breast=0&face_proportion=7&eye_spacing=2&eye_size=0&outfit=1018236";
};

export const setAvatar = (avatar) => {
    localStorage.setItem("werewolf__avatar", avatar);
};

export const setColor = (color) => {
    localStorage.setItem("werewolf__color", color);
};

export const getColor = () => {
    return localStorage.getItem("werewolf__color") || "#87ceeb";
};