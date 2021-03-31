window.speechSynthesis.getVoices();

export default function speak(message) {
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

  window.responsiveVoice.speak(message, "UK English Male", {
    pitch: 0.6,
    volume: 2,
  });
}
