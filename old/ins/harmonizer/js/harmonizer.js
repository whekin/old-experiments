(function(window) {
	'use strict';
	/**
	 * @class
	 */
	class Harmonizer {
		/**
		 * @constructor
		 * @return {Object}
		 */
		constructor () {
			this.notes = [
				"c", "cd", "d",
				"dd", "e", "f",
				"fd", "g", "gd",
				"a", "ad", "h"
			];

			this.scaleMasks = {
				major: [1,1,0,1,1,1,0],
				minor: [1,0,1,1,0,1,1]
			}
			
			this.chordMasks = {
				major: [0, 2, 4],
				minor: [0, "b2", 4],
				aug: [0, 2, "b5"],
				sus2: [0, 1, 4],
				sus4: [0, "b3", 4],
				dim: [0, "b2", "b4"],

				maj7: [0, 2, 4, 6],
				min7: [0, "b2", 4, "b6"],
				_7: [0, 2, 4, "b6"],
				
				dim7: [0, "b2", "b4", "bb6"]

			}
			// звукоряд
			this.scale = [];
		}

		/**
		 * Create scale
		 * @param  {String} tonality kind ton(c, cd, f)_fret(maj, min)
		 * @return {Array.<String>}
		 */
		createScale(tonality) {
			// тип лада
			let scale = [];
			let type_fret = ~tonality.indexOf("maj") ? "major" : "minor";

			let isMajor = type_fret == "major"? true : false;

			let mask = isMajor ? this.scaleMasks.major : this.scaleMasks.minor;

			let noteTonality = tonality.match(/(\w{1,2})\_\w{3}/)[1];

			let j = this.getNotePosition(noteTonality);
			let step = 0;
			scale[0] = noteTonality;

			for (let i = 1; i < 7; ++i) {
				step = mask[i-1] ? 2 : 1;
				j += step;
				if (j >= 12) j -= 12;
				scale[i] = this.notes[j];
			}

			return scale;
		}

		/**
		 * Define number position of note in 12 notes from "c"
		 * @param  {String} note
		 * @return {number}
		 */
		getNotePosition(note) {
			let pos = 0;
			switch (note) {
				case "cd":
					pos = 1;
					break;
				case "d":
					pos = 2;
					break;
				case "dd":
					pos = 3;
					break;
				case "e":
					pos = 4;
					break;
				case "f":
					pos = 5;
					break;
				case "fd":
					pos = 6;
					break;
				case "g":
					pos = 7;
					break;
				case "gd":
					pos = 8;
					break;
				case "a":
					pos = 9;
					break;
				case "ad":
					pos = 10;
					break;
				case "h":
					pos = 11;
					break;
			}
			return pos;
		}

		/**
		 * Creaters a chord
		 * @param  {string} tonality
		 * @param  {string} type
		 * @return {Array.<string>}
		 */
		createChord(tonality, type = "null") {
			let scale = this.createScale(tonality);
			let mask;
			let chord = [];

			switch (type) {
				case "major":
					mask = this.chordMasks.major;
					break;
				case "minor":
					mask = this.chordMasks.minor;
					break;
				case "_7":
					mask = this.chordMasks._7;
					break;
				case "aug":
					mask = this.chordMasks.aug;
					break;
				case "dim":
					mask = this.chordMasks.dim;
					break;
				case "sus2":
					mask = this.chordMasks.sus2;
					break;
				case "sus4":
					mask = this.chordMasks.sus4;
					break;
				case "maj7":
					mask = this.chordMasks.maj7;
					break;
				case "dim7":
					mask = this.chordMasks.dim7;
					break;
				case "min7":
					mask = this.chordMasks.min7;
					break;
				default:
					mask = this.chordMasks.major;
			}

			let mask_len = mask.length;
			let countD = 0;
			for (let i = 0; i < mask_len; ++i) {
				if (typeof mask[i] == "number") {
					chord.push(scale[mask[i]]);
				} else {
					let reg = /(\w+)(\d)/;
					let res = reg.exec(mask[i]);
				
					countD = res[1].length;

					let u = scale[res[res.length - 1]];
					
					for (let j = 0; j < countD; ++j) {
						u = this.b(u);
					}
					chord.push(u);
				}
			}

			return chord;
		}
		
		/**
		 * бемоль от ноты
		 * @param  {String} note
		 * @return {String}
		 */
		b(note) {
			let pos = this.getNotePosition(note);
			if (pos > 0)
				return this.notes[pos - 1];
			else 
				return this.notes[11];
		}
		
		/**
		 * Диез от ноты
		 * @param  {String} note
		 * @return {String}
		 */
		d(note) {
			let pos = this.getNotePosition(note);
			if (pos < 11)
				return this.notes[pos + 1];
			else
				return this.notes[0];
		}

		/**
		 * To harmonize gamma
		 * @param  {string} tonality
		 * @return {Array.<string>}
		 */
		toHarmonize(tonality) {
			let chords = [];
			let scale = this.createScale(tonality);
			
			for (let i = 0; i < 7; ++i) {
				let a, b;
				if (i + 2 >= 7) {
					a = scale[i - 5];
				} else {
					a = scale[i + 2]
				}

				if (i + 4 >= 7) {
					b = scale[i - 3];
				} else {
					b = scale[i + 4];
				}
				let scaleChord = [scale[i], a, b];
				let name_chord = this.getNameChord(scaleChord);
				chords.push({name: name_chord, notes: scaleChord});
			}

			return chords;
		}

		/**
		 * Get name chord
		 * @param  {Array.<string>}  chord
		 * @return {String}
		 */
		getNameChord(chord) {
			let tonic = chord[0];

			let intervals = [];
			for (let i = 0; i < chord.length - 1; ++i) {
				
				intervals[i] = this.getNotePosition(chord[i+1]) - this.getNotePosition(tonic);
				if (intervals[i] < 0)
					intervals[i] += 12;
			}
			
			let chord_name;

			tonic = tonic.toUpperCase();

			switch (intervals.join("")) {
				case "47":
					chord_name = tonic;
					break;
				case "37":
					chord_name = tonic + "m";
					break;
				case "48":
					chord_name = tonic + "aug";
					break;
				case "27":
					chord_name = tonic + "sus2";
					break;
				case "57":
					chord_name = tonic + "sus4";
					break;
				case "36":
					chord_name = tonic + "dim";
					break;
				case "4710":
					chord_name = tonic + "maj7";
					break;
				case "379":
					chord_name = tonic + "min7";
					break;
				case "479":
					chord_name = tonic + "7";
					break;
				case "368":
					chord_name = tonic + "dim7";
					break;
			}

			return chord_name;
		}
	}

	window.Harmonizer = Harmonizer;
})(this)