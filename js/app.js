function play(hz, type, seconds) {
    var osc = new Tone.Oscillator(hz, type).toMaster().start().stop("+5");
}
