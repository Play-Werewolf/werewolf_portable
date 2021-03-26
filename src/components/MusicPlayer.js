import React, { Component } from "react";
import Sound from "react-sound";

import { dict, Phases } from "../Game";

const lobby_music =
  "https://soundimage.org/wp-content/uploads/2018/10/Our-Mountain_v003_Looping.mp3";
const night_music =
  "http://soundimage.org/wp-content/uploads/2016/01/The-Castle-Beyond-the-Forest_Looping.mp3";

const soundtracks = dict(
  [
    Phases.LOBBY,
    {
      url: lobby_music,
      loop: true,
      volume: 30,
    },
  ],

  [
    Phases.ROLE_SELECTION,
    {
      url: lobby_music,
      loop: true,
      volume: 30,
    },
  ],

  [
    Phases.PRE_GAME,
    {
      url: lobby_music,
      loop: true,
      volume: 30,
    },
  ],

  [
    Phases.NIGHT_TRANSITION,
    {
      url: "../asset/sound/howling.mp3",
      loop: false,
      volume: 50,
    },
  ],

  [
    Phases.NIGHT,
    {
      url: night_music,
      loop: true,
      volume: 60,
    },
  ],

  [
    Phases.DAY_TRANSITION,
    {
      url: "../asset/sound/crowing.mp3",
      loop: false,
      volume: 50,
    },
  ],

  [
    Phases.DAY_CALLOUTS,
    {
      url:
        "http://soundimage.org/wp-content/uploads/2014/12/Drinking-Alone.mp3",
      loop: false,
      volume: 50,
    },
  ],

  [
    Phases.DISCUSSION,
    {
      url: "http://soundimage.org/wp-content/uploads/2014/10/Lost-Island.mp3",
      loop: true,
      volume: 40,
    },
  ],

  [
    Phases.TRIAL,
    {
      url: "http://soundimage.org/wp-content/uploads/2015/03/Goblin-Loop.mp3",
      loop: true,
      volume: 20,
    },
  ],

  [
    Phases.EXECUTION,
    {
      url: "http://soundimage.org/wp-content/uploads/2015/03/Goblin-Loop.mp3",
      loop: true,
      volume: 40,
    },
  ],

  [
    Phases.GAME_OVER,
    {
      url:
        "http://soundimage.org/wp-content/uploads/2016/07/RPG-Battle-Climax_v001.mp3",
      loop: true,
      volume: 40,
    },
  ]
);

class MusicPlayer extends Component {
  render() {
    if (soundtracks[this.props.phase]) {
      return (
        <Sound
          url={soundtracks[this.props.phase].url}
          volume={soundtracks[this.props.phase].volume}
          playStatus={Sound.status.PLAYING}
          loop={soundtracks[this.props.phase].loop}
        />
      );
    } else {
      return <div></div>;
    }
  }
}

export default MusicPlayer;
