
const getVoice = (name) => {
    var vcs = speechSynthesis.getVoices().filter(x => ~x.name.indexOf(name));
    return vcs.length ? vcs[0] : null;
};
``
export default (message) => {
    return new Promise((resolve, reject) => {
        var voice = getVoice("UK English Male") || getVoice("UK");
        var pitch = 0.6;

        var msg = new SpeechSynthesisUtterance(message);
        msg.pitch = pitch;
        msg.voice = voice;
        msg.onend = resolve;

        speechSynthesis.cancel();
        speechSynthesis.speak(msg);
    });
};