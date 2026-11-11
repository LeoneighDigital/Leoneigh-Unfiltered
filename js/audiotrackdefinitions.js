/* ============================================================
   AUDIO TRACK DEFINITIONS
   ============================================================ */
function genMelisma() {
  var scale = [311.13, 349.23, 369.99, 415.30, 466.16, 523.25, 554.37, 622.25];
  var notes = [];
  var t = 0.4;
  var idx = 0;
  var dir = 1;
  for (var i = 0; i < 44; i++) {
    var d = 0.14 + (Math.sin(i * 1.7) * 0.03);
    notes.push({ t: t, f: scale[idx], d: d, a: 0.07 });
    t += d * 0.78;
    idx += dir;
    if (idx >= scale.length - 1) { idx = scale.length - 1; dir = -1; }
    if (idx <= 0) { idx = 0; dir = 1; }
  }
  return notes;
}

function genHarmony() {
  var notes = [];
  var chords = [
    [311.13, 369.99, 466.16],
    [415.30, 523.25, 622.25],
    [466.16, 587.33, 698.46]
  ];
  var startT = 0.5;
  var chordDur = 3.4;
  chords.forEach(function (chord, ci) {
    chord.forEach(function (f, vi) {
      notes.push({
        t: startT + ci * (chordDur + 0.4),
        f: f,
        d: chordDur,
        a: 0.055 - vi * 0.008
      });
    });
  });
  return notes;
}

var TRACKS = [
  {
    id: 'TRACK 01',
    title: 'Raw Belt Resonance Drill',
    key: 'Eb Minor',
    range: 'G3 - C5',
    bpm: '112',
    duration: 8,
    wave: 'sawtooth',
    filter: 1400,
    vibrato: { rate: 5.2, depth: 6 },
    notes: [
      { t: 0.4, f: 311.13, d: 2.8, a: 0.10 },
      { t: 3.8, f: 349.23, d: 2.8, a: 0.10 },
      { t: 7.0, f: 311.13, d: 0.7, a: 0.09 }
    ]
  },
  {
    id: 'TRACK 02',
    title: 'Melismatic Agility & Pitch Run',
    key: 'Eb Minor',
    range: 'G3 - C5',
    bpm: '112',
    duration: 10,
    wave: 'triangle',
    filter: 2400,
    vibrato: null,
    notes: genMelisma()
  },
  {
    id: 'TRACK 03',
    title: 'Vocal Harmony Stack',
    key: 'Eb Minor',
    range: 'G3 - C5',
    bpm: '112',
    duration: 12,
    wave: 'sine',
    filter: 1200,
    vibrato: { rate: 4.0, depth: 2.5 },
    notes: genHarmony()
  }
];