function playPerSet(content) {
    document.getElementById("playing").innerHTML = "正在執行 f1 : " + content.frequency1 + " f2 : " + content.frequency2 + " wave : " + content.wave;

    for (i = 0; i < content.timeInSeconds; i++) {
        playPerSecond(content.frequency1, content.frequency2, content.wave);
        sleep(1000);
    }
}

function playPerSecond(f1, f2, wave){
    var merge = new Tone.Merge().toMaster();

    var osc1 = new Tone.Oscillator(f1, wave).connect(merge.left);
    var osc2 = new Tone.Oscillator(f2, wave).connect(merge.right);

    osc1.start().stop("+1");
    osc2.start().stop("+1");
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while (1)
        if ((new Date().getTime() - start) > milliseconds)
            break;
}
