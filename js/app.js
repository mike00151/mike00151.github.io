function play(hz, type, seconds) {
    
    var merge = new Tone.Merge().toMaster();

    var osc1 = new Tone.Oscillator(1, "square").connect(merge.left);
    var osc2 = new Tone.Oscillator(5, "square").connect(merge.right);

    osc1.start().stop("+10");
    osc2.start().stop("+10");

}
