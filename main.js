"use strict";


// const randomIntButton = document.getElementById('randomIntButton');
const frequency = document.getElementById('frequency');

class Sound {

  constructor(context) {
    this.context = context;
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  play(value, time) {
    this.init();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
            
    this.oscillator.start(time);
    this.stop(time);

  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.100, time + 1);
    this.oscillator.stop(time + 1);
  }
}

const frequencyMap = {
  c4: 261.63,
  d4: 293.66,
  e4: 329.63,
  f4: 349.23,
  g4: 392.00,
  a4: 440.00,
  b4: 493.88,
  c5: 523.25,
}

let context = new (window.AudioContext || window.webkitAudioContext)();

// randomIntButton.addEventListener('click', function() {
// 			let note = new Sound(context);
// 			let now = context.currentTime;
// 			let randomInt = Math.round(Math.random() * 600);
// 			note.play(frequencyMap.c4, now);
// 			note.play(_.sample(frequencyMap, 1), now + 1);
// 			frequency.innerHTML = "<p>" + randomInt + "</p>";
// });


$('#randomIntButton').on('touchstart click', function() {
     let note = new Sound(context);
     let now = context.currentTime;
     let randomInt = Math.round(Math.random() * 600);
     note.play(frequencyMap.c4, now);
     note.play(_.sample(frequencyMap, 1), now + 1);
     frequency.innerHTML = "<p>" + randomInt + "</p>";
});
