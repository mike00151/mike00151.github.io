function playPerSet(content) {

    var merge = new Tone.Merge().toMaster();

    var osc1 = new Tone.Oscillator(content.frequency1, content.wave).connect(merge.left);
    var osc2 = new Tone.Oscillator(content.frequency2, content.wave).connect(merge.right);

    osc1.start().stop(content.timeInSeconds);
    osc2.start().stop(content.timeInSeconds);

    // Wait for the end.
    while (osc1.state == "started" && osc2.state == "started") {
        sleep(500);
    }

    return;

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while (1)
        if ((new Date().getTime() - start) > milliseconds)
            break;
}
