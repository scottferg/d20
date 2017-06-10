export default class Spell {
    constructor(spell) {
        if (spell === undefined) {
            return;
        }

        var that = this;

        Object.keys(spell).forEach(function(key) {
            that[key] = spell[key];
        });
    }

    verboseLevel() {
        switch (this.Level) {
            case 0:
                return "";
            case 1:
                return "1st-level ";
            case 2:
                return "2nd-level ";
            case 3:
                return "3rd-level ";
            default:
                return this.Level + "th-level ";
        }
    }

    schoolLevel() {
        switch (this.school) {
            case "EV":
                return this.verboseLevel() + "Evocation";
            case "EN":
                return this.verboseLevel() + "Enchantment";
            case "D":
                return this.verboseLevel() + "Divination";
            case "C":
                return this.verboseLevel() + "Conjuration";
            case "T":
                return this.verboseLevel() + "Transmutation";
            case "A":
                return this.verboseLevel() + "Abjuration";
            case "N":
                return this.verboseLevel() + "Necromancy";
            case "I":
                return this.verboseLevel() + "Illusion";
            default:
                return "";
        }
    }
}
