import openSocket from "socket.io-client";

var dispatch = null;

const update = (up) => {
    dispatch({
        type: "UPDATE_MULTIPLAYER",
        payload: up
    });
};

window.action = (type, payload) => {
    window.io.emit("action", { type, payload });
};

export const init = (_dispatch) => {
    dispatch = _dispatch;
    window.onConnected = [];
    window.io = openSocket("ws://localhost:12988/");
    
    window.io.on("connected", () => {
        update({
            connected: true,
            roomId: null,
            players: []
        });

        if (window.onConnected) {
            for (var x of window.onConnected) {
                x();
            }
        }
    });

    window.io.on("disconnect", () => {
        update({connected: false});
    });

    window.io.on("room", function(data) {
        update({roomId: data});
    });

    window.io.on("join_error", function(data) {
        if (window.onJoinError) {
            window.onJoinError(data);
        }
    });

    window.io.on("state", function(data) {
        console.log("state update ", data);
        update(data);
    })
};

export const createRoom = () => {
    window.io.emit("create");
};

export const joinRoom = (roomId) => {
    window.io.emit("join", roomId);
};

export const setNickname = (nickname) => {
    window.io.emit("nickname", nickname);
};
