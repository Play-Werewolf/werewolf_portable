import openSocket from "socket.io-client";

import React from "react";

import speak from "./Voice";
import NotificationView from "./components/NotificationsView";
import { Presets } from "./Game";

import { moveTo } from "./actions/PagesActions";

var dispatch = null;
var roomId = null;

window.VERSION = "1.0.3";

const update = (up) => {
  dispatch({
    type: "UPDATE_MULTIPLAYER",
    payload: up,
  });
  roomId = up.roomId || roomId || null;
};

window.action = (type, payload) => {
  window.io.emit("action", { type, payload });
};

const createRefreshToken = (roomId) => {
  var token = roomId + "/" + window.io.id;
  window.localStorage.setItem("werewolf__refresh_token", token);
};

const clearRefreshToken = () => {
  window.localStorage.setItem("werewolf__refresh_token", "");
};

const getRefreshToken = () => {
  return window.localStorage.getItem("werewolf__refresh_token") || null;
};

export const init = (_dispatch) => {
  dispatch = _dispatch;
  window.onConnected = [];

  // if (window.location.hostname.startsWith("localhost")) {
  //   window.io = openSocket("ws://127.0.0.1:12988/");
  // } else {
    window.io = openSocket("wss://werewolf-old.herokuapp.com");
  // }

  window.io.on("connected", () => {
    update({
      connected: true,
      roomId: null,
      players: [],
      id: window.io.id,
    });

    if (window.onConnected) {
      for (var x of window.onConnected) {
        x();
      }
    }

    if (getRefreshToken()) {
      window.io.emit("refresh_token", getRefreshToken());
    }
  });

  window.io.on("disconnect", () => {
    update({ connected: false });
  });

  window.io.on("room", function (data) {
    update({ roomId: data });
    window.location.href = "#" + data;
    createRefreshToken(data);
  });

  window.io.on("join_error", function (data) {
    if (window.onJoinError) {
      window.onJoinError(data);
    }
  });

  window.io.on("state", function (data) {
    update(data);
  });

  window.io.on("kick", function () {
    leaveRoom();
    window.Modal.open(
      <div>
        <center>
          <h1>You have been kicked by the host</h1>
        </center>
        <button
          className="ui button"
          style={{
            backgroundColor: "#ac6635",
            position: "absolute",
            bottom: "20px",
            right: "20px",
          }}
          onClick={() => window.Modal.close()}
        >
          Oof
        </button>
      </div>
    );
  });

  window.io.on("speak", function (data) {
    speak(data);
  });

  window.io.on("seer_result", function (data) {
    let _nightAction = nightAction;
    window.Modal.open(
      <center>
        <h3>You sense that your target is...</h3>
        <div style={{ display: "block", height: "100%" }}>&nbsp;</div>
        <h1>{data.seer_result === "GOOD" ? "Good" : "Evil"}</h1>
        <button
          className="ui button"
          style={{
            backgroundColor: "#ac6635",
            position: "absolute",
            bottom: "20px",
            right: "20px",
          }}
          onClick={() => {
            window.Modal.close();
            _nightAction(true);
          }}
        >
          Ok
        </button>
      </center>
    );
  });

  window.io.on("open_messages", function (data) {
    window.notifications = data;
    showNotifications();
  });

  window.io.on("refresh_fail", clearRefreshToken);

  window.io.on("version", function (data) {
    if (data !== window.VERSION) {
      window.Modal.open(
        <div>
          <center>
            <h1>Uh Oh...</h1>
            <h3>
              It seems like this is not the most recent version of the game.
              <br />
              Do you want to try and refresh the cache?
            </h3>
          </center>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              textAlign: "right",
            }}
          >
            (We are not really giving you the choice)
            <br />
            <br />
            <button
              className="ui primary button"
              onClick={() => window.location.reload()}
            >
              Yes
            </button>
          </div>
        </div>
      );
    }
  });

  // This code is **most probably** error prone! Please be cautious with it, future me...
  window.onhashchange = function () {
    if (window.location.hash !== "#" + roomId) {
      leaveRoom();
    }
  };

  window.io.emit("version"); // Checking version control
};

export const createRoom = () => {
  window.io.emit("create");
};

export const joinRoom = (roomId) => {
  window.io.emit("join", roomId);
};

export const leaveRoom = () => {
  window.io.emit("leave");
  window.location.href = "#";
  clearRefreshToken();
  update({ roomId: null });
};

export const setDetails = (details) => {
  window.io.emit("details", details);
};

export const startGame = () => {
  window.action("start_game");
};

export const kick = (player) => {
  window.action("kick", player);
};

export const nightAction = (payload) => {
  window.action("night_action", payload);
};

export const setVote = (player) => {
  window.action("set_vote", player);
};

export const trialGuilty = () => {
  window.action("trial_guilty");
};

export const trialInnocent = () => {
  window.action("trial_innocent");
};

export const addRole = (role) => {
  window.action("add_role", role);
};

export const removeRole = (role) => {
  window.action("remove_role", role);
};

export const setPreset = (preset) => {
  window.action("set_preset", Presets[preset].roles);
};

export const skipDay = () => {
  window.action("skip_day");
};

export const showNotifications = () => {
  window.Modal.open(
    <div>
      <NotificationView
        messages={window.notifications}
        key={Math.random().toString()}
      />
      <button
        className="ui button"
        style={{
          backgroundColor: "#ac6635",
          position: "absolute",
          bottom: "20px",
          right: "20px",
        }}
        onClick={() => {
          window.Modal.close();
        }}
      >
        Ok
      </button>
    </div>
  );
};
