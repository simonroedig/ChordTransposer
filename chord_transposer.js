/*
ChordTransposer.transpose(chord, transpose_steps, flat_or_sharp) 
will take any chord (even fancy complex jazz chords)
and transpose it by any number of steps with
the desired sharp or flat notation.

Parameters: 
    chord: string of the chord, e.g. "C#maj7"
    transpose_steps: integer (positive or negative), e.g. 1, -4, 2, 0
    flat_or_sharp: either "♭", "♯" or "flat", "sharp", or "b", "#", or 0, "0"

If ChordTransposer.transpose(...) is called with only the chord parameter, it will return the chord unchanged.

If ChordTransposer.transpose(...) is called with only the chord and transpose_steps parameter, 
it will return the chord transposed by the number of steps with the same sharp or flat symbol derivation from the original chord.

If ChordTransposer.transpose(...) is called with only the chord and flat_or_sharp parameter,
it will return the chord adjusted to the desired sharp or flat symbol.

-> ChordTransposer.transpose(...) will assume, depending on the parameters, whether the second parameter is transpose_steps or flat_or_sharp.

ChordTransposer.transpose(...) makes sure, that only the relevant sharp or flat symbol is changed, 
e.g ChordTransposer.transpose("C♯maj7b5", 2, "#") will return "D#maj7b5" and not "D#maj7#5".
*/

const ChordTransposer = (() => {

    // Function will only ever be called with a sharp chord, as _transposeChord is called first which converts all flats to sharps
    function _flatOrSharp(chord, flat_or_sharp) {
        if (flat_or_sharp == "#") return chord
        if (flat_or_sharp == "0") return chord
        
        const sharp_notes = ["C#", "D#", "F#", "G#", "A#"];
        const flat_notes = ["Db", "Eb", "Gb", "Ab", "Bb"];
        
        for (let i = 0; i < sharp_notes.length; i++) {
            if (chord.includes(sharp_notes[i])) {
                chord = chord.replace(sharp_notes[i], flat_notes[i]);
            }
        }
        return chord;
    }

    function _transposeChord(chord, n) {
        chord = chord.replace(/♯/g, "#");
        chord = chord.replace(/♭/g, "b");

        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const sharp_notes = ["C#", "D#", "F#", "G#", "A#"];
        const flat_notes = ["Db", "Eb", "Gb", "Ab", "Bb"];

        for (let i = 0; i < flat_notes.length; i++) {
            if (chord.includes(flat_notes[i])) {
                chord = chord.replace(flat_notes[i], sharp_notes[i]);
            }
        }
        const chord_array = chord.split('/');
        const base_chord = chord_array[0];
        const slash_chord = chord_array[1];

        const transposed_base_chord = base_chord.replace(/[CDEFGAB]#?/g, match => {
            const index = (notes.indexOf(match) + n) % 12;
            if (index < 0) return notes[index + 12];
            return notes[index];
        });

        if (slash_chord) {
            const transposed_slash_chord = slash_chord.replace(/[CDEFGAB]#?/g, match => {
                const index = (notes.indexOf(match) + n) % 12;
                if (index < 0) return notes[index + 12];
                return notes[index];
            });
            return transposed_base_chord + '/' + transposed_slash_chord;
        }
        return transposed_base_chord;
    }

    return {
        transpose: function(chord, transpose_steps = 0, flat_or_sharp = "0") {
            const validFlatSharpValues = ["#", "b", "sharp", "flat", "♯", "♭", "0"];
    
            if (validFlatSharpValues.includes(transpose_steps) && flat_or_sharp == "0") {
                flat_or_sharp = transpose_steps;
                transpose_steps = 0;
            }
            
            const flatCount = (chord.match(/♭|b/g) || []).length;
            const sharpCount = (chord.match(/♯|#/g) || []).length;

            if (flat_or_sharp == "0") {
                if (flatCount > sharpCount) {
                    flat_or_sharp = "b";
                } else if (sharpCount > flatCount) {
                    flat_or_sharp = "#";
                } else {
                    flat_or_sharp = "0";
                }
            }
        
            if (flat_or_sharp == "flat") flat_or_sharp = "b";
            if (flat_or_sharp == "sharp") flat_or_sharp = "#";
            if (flat_or_sharp == "♭") flat_or_sharp = "b";
            if (flat_or_sharp == "♯") flat_or_sharp = "#"

            return _flatOrSharp(_transposeChord(chord, transpose_steps), flat_or_sharp);
        }
    };

})();

export default ChordTransposer;
