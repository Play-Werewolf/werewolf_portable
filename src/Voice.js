import { get } from "https";

window.speechSynthesis.getVoices();

const getVoice = (name) => {
  var vcs = speechSynthesis.getVoices().filter((x) => ~x.name.indexOf(name));
  window.io.emit(
    "debug",
    speechSynthesis.getVoices().map((x) => x.name)
  );
  return vcs.length ? vcs[0] : null;
};

const defaultVoice = () => {
  return (
    getVoice("UK English Male") ||
    getVoice("Japanese Japan") ||
    getVoice("English")
  );
};

export default (message) => {
  // return new Promise((resolve, reject) => {
  //     alert(defaultVoice().name);
  //     var voice = defaultVoice();
  //     var pitch = 0.6;

  //     var msg = new SpeechSynthesisUtterance(message);
  //     msg.pitch = pitch;
  //     msg.voice = voice;
  //     msg.onend = resolve;

  //     speechSynthesis.cancel();
  //     speechSynthesis.speak(msg);
  // });

  responsiveVoice.speak(message, "UK English Male", { pitch: 0.6, volume: 2 });
};
