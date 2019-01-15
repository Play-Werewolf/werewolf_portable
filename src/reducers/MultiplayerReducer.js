const initialState = {
    roomId: null,
    players: [
        {
            id: "182736125",
            name: "Yotam",
            img: "https://semantic-ui.com/images/avatar/small/steve.jpg"
        },
        {
            id: "6345234318",
            name: "Koren",
            img: "https://semantic-ui.com/images/avatar2/small/matthew.png"
        },
        {
            id: "34523657445",
            name: "Ron",
            img: "https://semantic-ui.com/images/avatar2/large/rachel.png"
        },
        {
            id: "09345342314",
            name: "Shai",
            img: "https://semantic-ui.com/images/avatar2/small/elyse.png"
        },
        {
            id: "34543657445",
            name: "Shir",
            img: "https://semantic-ui.com/images/avatar/large/elliot.jpg"
        },
        {
            id: "09394342314",
            name: "Daniel",
            img: "https://semantic-ui.com/images/avatar/large/daniel.jpg"
        },
        {
            id: "34543657245",
            name: "Shaked",
            img: "https://semantic-ui.com/images/avatar2/large/molly.png"
        },
        {
            id: "09394372314",
            name: "Or",
            img: "https://semantic-ui.com/images/avatar/large/jenny.jpg"
        },
        {
            id: "34543657449",
            name: "Diana",
            img: "https://semantic-ui.com/images/avatar/large/helen.jpg"
        },
        {
            id: "19394342314",
            name: "Kalman",
            img: "https://semantic-ui.com/images/avatar/large/veronika.jpg"
        }
    ],
    clients: [],
    connected: false
};

const MultiplayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_MULTIPLAYER":
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default MultiplayerReducer;
