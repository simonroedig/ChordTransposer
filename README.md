<h1>♫ TRANSPOSE ANY CHORD ♯♭♮</h1>

##  Description

ChordTransposer.transpose(chord, transpose_steps, flat_or_sharp) will take `any chord (even fancy complex jazz chords)` and `transpose` it by any `number of steps` with the `desired sharp or flat notation`.

## Install
```
npm i every-chord-transposer

```
```
import ChordTransposer from 'every-chord-transposer/chord_transposer.js';

var transposedChord = ChordTransposer.transpose("Cmaj7b5", 1, "#");
console.log(transposedChord); // C#maj7b5
```
```
package.json
{
  "dependencies": {
    "every-chord-transposer": "^..."
  },
  "type": "module"
}
```

## Parameters

`chord`: string of the chord, e.g. "C#maj7" <br>
`transpose_steps`: integer (positive or negative), e.g. 1, -4, 2, 0 <br>
`flat_or_sharp`: either "♭", "♯" or "flat", "sharp", or "b", "#", or 0, "0", or "♮" <br>

► If ChordTransposer.transpose(...) is called with only the chord parameter, it will return the chord unchanged. <br>
► If ChordTransposer.transpose(...) is called with only the chord and transpose_steps parameter, it will return the chord transposed by the number of steps with the same sharp or flat symbol derived from the original chord. <br>
► If ChordTransposer.transpose(...) is called with only the chord and flat_or_sharp parameter,it will return the chord adjusted to the desired sharp or flat symbol. <br>

►►► ChordTransposer.transpose(...) will assume, depending on the parameters, whether the second parameter is transpose_steps or flat_or_sharp. <br>

► ChordTransposer.transpose(...) makes sure, that only the relevant sharp or flat symbol is changed,
e.g. ChordTransposer.transpose("C♯maj7b5", 2, "#") will return "D#maj7b5" and not "D#maj7#5".

##  Usage (Check usage_example.js file):
```javascript
import ChordTransposer from './chord_transposer.js'; 
// import ChordTransposer from 'every-chord-transposer/chord_transposer.js'; // if installed via npm i every-chord-transposer

// One parameter (chord) -> returns same chord
var transposedChord = ChordTransposer.transpose("C#");
console.log(transposedChord); // C#

// Two parameters (chord, transpose_steps) -> returns chord transposed by transpose_steps 
// and DERIVES sharp or flat based on orginal chord
transposedChord = ChordTransposer.transpose("F#", 2);
console.log(transposedChord); // G#

transposedChord = ChordTransposer.transpose("Eb", -5);
console.log(transposedChord); // Bb

transposedChord = ChordTransposer.transpose("Eb", 0);
console.log(transposedChord); // Eb


// Two parameters (chord, flat_or_sharp) -> returns chord adjusted to flat or sharp
transposedChord = ChordTransposer.transpose("Eb", "#");
console.log(transposedChord); // D#

transposedChord = ChordTransposer.transpose("F#", "b");
console.log(transposedChord); // Gb

transposedChord = ChordTransposer.transpose("F#", "0");
console.log(transposedChord); // F#


// Three parameters (chord, transpose_steps, flat_or_sharp) -> returns chord 
// transposed by transpose_steps and adjusted to flat or sharp
transposedChord = ChordTransposer.transpose("F#", 2, "b");
console.log(transposedChord); // Ab

transposedChord = ChordTransposer.transpose("Eb", -5 , "b");
console.log(transposedChord); // Bb

transposedChord = ChordTransposer.transpose("Fmaj7", 1 , "#");
console.log(transposedChord); // F#maj7

transposedChord = ChordTransposer.transpose("C♯maj7b5", 2, "♯");
console.log(transposedChord); // D#maj7b5

transposedChord = ChordTransposer.transpose("G13(♭9♯11)", -1, "b");
console.log(transposedChord); // Gb13(b9#11)

transposedChord = ChordTransposer.transpose("Bb/C#", -2, "b");
console.log(transposedChord); // Ab/B
```