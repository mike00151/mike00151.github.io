var WaveType = {
    "POSTIVE": 1,
    "NEGTIVE": -1,
    "BOTH": 0
}

function test(){
    var synth = new Tone.Synth().toMaster();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
    console.log("12345");
    console.log(synth);

}

function play(channel0, channel1, seconds) {
    playPer(channel0, channel1, seconds);
    test();
}
function playPer(channel0, channel1, seconds) {
    console.log("qqqqqqq");
    if (seconds <= 0) {
        return;
    }
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var sampleRate = audioContext.sampleRate;
    var duration = sampleRate * 1.0;
    var numChannels = 2;
    var buffer = audioContext.createBuffer(numChannels, duration, sampleRate);
    buildChannelData(buffer.getChannelData(0), sampleRate, channel0["frequency"], channel0["wave_type"]);
    buildChannelData(buffer.getChannelData(1), sampleRate, channel1["frequency"], channel1["wave_type"]);
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    // finally start to play
    source.start();
    source.onended = () => {
        console.log('White noise finished');
        playPer(channel0, channel1, seconds - 1)
    }
    return;
}
function buildChannelData(channelData, sampleRate, frequency, waveType) {
    var per = parseInt(sampleRate / (frequency * 2));
    for (var i = 0; i < sampleRate; i++) {
        channelData[i] = 1;
    }
    return buildWaveType(channelData, waveType);
}
function buildWaveType(channelData, waveType) {
    for (var i = 0; i < channelData.length; i++) {
        switch (waveType) {
            case WaveType.POSTIVE:
                if (channelData[i] < 0) {
                    channelData[i] = 0;
                }
                break;
            case WaveType.NEGTIVE:
                if (channelData[i] > 0) {
                    channelData[i] = 0;
                }
                break;
            case WaveType.BOTH:
                break;
        }
    }
    return channelData;
}
function playFrequency(frequency) {
    // create 2 second worth of audio buffer, with single channels and sampling rate of your device.
    var audioContext = new AudioContext();
    var sampleRate = audioContext.sampleRate;
    var duration = 2 * sampleRate;
    var numChannels = 1;
    console.log(sampleRate)
    var buffer = audioContext.createBuffer(numChannels, duration, sampleRate);
    // fill the channel with the desired frequency's data
    var channelData = buffer.getChannelData(0);
    for (var i = 0; i < sampleRate; i++) {
        channelData[i] = Math.sin(2 * Math.PI * frequency * i / (sampleRate));
    }
    // create audio source node.
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    // finally start to play
    source.start(0);
}