import Speech from "speak-tts";

export default function speech() {
  const speech = new Speech();
  speech
    .init({
      volume: 0.75,
      lang: "en-GB",
      rate: 1,
      pitch: 1,
      voice: "Google UK English Male",
    })
    .then((data) => {
      console.log("Speech is ready", data);
      prepareSpeaking(speech);
    })
    .catch((e) => {
      console.error("An error occured while initializing speech: ", e);
    });
  speech.hasBrowserSupport()
    ? console.log("Hurray, your browser supports speech synthesis")
    : console.log(
        "Your browser does NOT support speech synthesis. Try using Chrome, Edge or Safari instead!"
      );
}

function prepareSpeaking(speech) {
  window.io.on("speak", function (data) {
    speech
      .speak({
        text: data,
        queue: false,
      })
      .catch((e) => {
        console.error("An error occurred while trying to speak:", e);
      });
  });
}
