// @format
import Item from "./item";

class SpellSlot {
    constructor(available) {
        this.available = available;
    }
}

class Player {
    constructor(player) {
        if (player === undefined) {
            this.str = 12;
            this.dex = 12;
            this.cha = 12;
            this.wis = 12;
            this.int = 12;
            this.con = 12;

            this.ac_mod = 0;
            this.initiative_mod = 0;
            this.proficiency_mod = 0;
            this.speed_mod = 0;

            this.xp = 0;

            this.money = {
                cp: 0,
                ep: 0,
                gp: 0,
                pp: 0,
                sp: 0,
            };

            // 10 slots, 0 is for Cantrips
            this.spellSlots = Array(10);
            this.spellSlots.fill(new SpellSlot(0));
            this.multiClassSpellSlots = Array(10);
            this.multiClassSpellSlots.fill(new SpellSlot(0));

            this.skills = [
                {name: "Acrobatics", proficient: false, expertise: false},
                {name: "Animal Handling", proficient: false, expertise: false},
                {name: "Arcana", proficient: false, expertise: false},
                {name: "Athletics", proficient: false, expertise: false},
                {name: "Deception", proficient: false, expertise: false},
                {name: "History", proficient: false, expertise: false},
                {name: "Insight", proficient: false, expertise: false},
                {name: "Intimidation", proficient: false, expertise: false},
                {name: "Investigation", proficient: false, expertise: false},
                {name: "Medicine", proficient: false, expertise: false},
                {name: "Nature", proficient: false, expertise: false},
                {name: "Perception", proficient: false, expertise: false},
                {name: "Performance", proficient: false, expertise: false},
                {name: "Persuasion", proficient: false, expertise: false},
                {name: "Religion", proficient: false, expertise: false},
                {name: "Sleight of Hand", proficient: false, expertise: false},
                {name: "Stealth", proficient: false, expertise: false},
                {name: "Survival", proficient: false, expertise: false},
            ];

            return;
        }

        var that = this;

        Object.keys(player).forEach(function(key) {
            that[key] = player[key];
        });
    }

    checkProficiency(save) {
        var result = false;
        this.classes.forEach(function(cls) {
            if (cls.cls.proficiency.includes(save)) {
                result = true;
            }
        });

        return result;
    }

    initiative(items = []) {
        return this.abilityBonus(this.dexScore(items)) + this.initiative_mod;
    }

    level() {
        var level = 0;

        this.classes.forEach(function(cls) {
            level += cls.level;
        });

        return level;
    }

    acWithoutBonus(items = []) {
        var ac = 0;
        var dexMod = this.abilityBonus(this.dexScore());

        var armorPieces = items.filter(function(item) {
            return (
                item.type === "S" ||
                item.type === "LA" ||
                item.type === "MA" ||
                item.type === "HA"
            );
        });

        armorPieces.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped === "Unequipped") {
                return;
            }

            ac += parseInt(item.ac, 10);

            if (item.type === "MA") {
                ac += dexMod <= 2 ? dexMod : 2;
            } else if (item.type === "LA") {
                ac += dexMod;
            }

            ac += item.acMod();
        });

        // If no armor is equipped base AC is 10
        if (ac === 0) {
            ac = 10 + dexMod;
        }

        return ac;
    }

    ac(items) {
        return this.acWithoutBonus(items) + this.ac_mod;
    }

    spellDC(ability) {
        var bonus = this.baseAbilityBonus(ability, true);

        bonus += this.proficiencyBonus();
        bonus += this.spellDcBonus();
        bonus += 8;

        return bonus;
    }

    proficiencyBonus(items = []) {
        var total =
            Math.ceil((this.level() - 1) / 4 + 2) + this.proficiency_mod;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.proficiencyMod();
            }
        });

        return total;
    }

    spellAttackBonus(items = []) {
        var total = 0;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.spellAttackMod();
            }
        });

        return total;
    }

    spellDcBonus(items = []) {
        var total = 0;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.spellDcMod();
            }
        });

        return total;
    }

    acBonus(items = []) {
        var total = 0;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.acMod();
            }
        });

        return total;
    }

    speedBonus(items = []) {
        var total = 0;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.speedMod();
            }
        });

        return total;
    }

    initiativeBonus(items = []) {
        var total = 0;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.initiativeMod();
            }
        });

        return total;
    }

    saveBonus(items = []) {
        var total = 0;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.saveMod();
            }
        });

        return total;
    }

    hpBonus(items = []) {
        var total = 0;

        items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.hpMod();
            }
        });

        return total;
    }

    passivePerception() {
        var bonus = 10 + this.abilityBonus(this.wisScore());

        if (this.skills[11].proficient) {
            bonus += this.proficiencyBonus();
        }

        return bonus;
    }

    abilityBonus(ability) {
        return Math.ceil((ability - 9.5) / 2.0) - 1;
    }

    abilityWithRaceMod(ability, base) {
        var abilities = this.race.ability.split(", ");

        var i = 0;

        while (i < abilities.length) {
            var values = abilities[i].split(" ");

            if (values[0].toLowerCase() === ability) {
                return base + parseInt(values[1], 10);
            }

            i++;
        }

        return base;
    }

    strScore(items = []) {
        var value = this.abilityWithRaceMod("str", this.str);

        items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("strength")) {
                    value += mod.value();
                }
            });
        });

        return value;
    }

    dexScore(items = []) {
        var value = this.abilityWithRaceMod("dex", this.dex);

        items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("dexterity")) {
                    value += mod.value();
                }
            });
        });

        return value;
    }

    conScore(items = []) {
        var value = this.abilityWithRaceMod("con", this.con);

        items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("constitution")) {
                    value += mod.value();
                }
            });
        });

        return value;
    }

    intScore(items = []) {
        var value = this.abilityWithRaceMod("int", this.int);

        items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("intelligence")) {
                    value += mod.value();
                }
            });
        });

        return value;
    }

    wisScore(items = []) {
        var value = this.abilityWithRaceMod("wis", this.wis);

        items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("wisdom")) {
                    value += mod.value();
                }
            });
        });

        return value;
    }

    chaScore(items = []) {
        var value = this.abilityWithRaceMod("cha", this.cha);

        items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("charisma")) {
                    value += mod.value();
                }
            });
        });

        return value;
    }

    baseAbilityBonus(ability, withRacialMod = true) {
        switch (ability) {
            case "str":
                return this.abilityBonus(
                    withRacialMod ? this.strScore() : this.str,
                );
            case "dex":
                return this.abilityBonus(
                    withRacialMod ? this.dexScore() : this.dex,
                );
            case "con":
                return this.abilityBonus(
                    withRacialMod ? this.conScore() : this.con,
                );
            case "int":
                return this.abilityBonus(
                    withRacialMod ? this.intScore() : this.int,
                );
            case "wis":
                return this.abilityBonus(
                    withRacialMod ? this.wisScore() : this.wis,
                );
            case "cha":
                return this.abilityBonus(
                    withRacialMod ? this.chaScore() : this.cha,
                );
            default:
                return this.abilityBonus(0);
        }
    }

    formatAbilityBonus(
        ability,
        items = [],
        withProficiency = false,
        withRacialMod = true,
        withItemMod = false,
    ) {
        var bonus = this.baseAbilityBonus(ability, withRacialMod);

        bonus += this.saveBonus(items);

        if (withItemMod) {
            bonus += this.spellAttackBonus(items);
        }

        if (withProficiency) {
            bonus += this.proficiencyBonus(items);
            return bonus > 0 ? "+" + bonus + "*" : "" + bonus;
        } else {
            return bonus > 0 ? "+" + bonus : "" + bonus;
        }
    }

    setSkill(skill, proficient, expertise) {
        var that = this;

        this.skills.forEach(function(s, index) {
            if (s.name === skill) {
                that.skills[index].proficient = proficient;
                that.skills[index].expertise = expertise;
            }
        });
    }

    skillScore(skill, items = []) {
        switch (skill) {
            case "Acrobatics":
                return this.abilityBonus(this.dexScore(items));
            case "Animal Handling":
                return this.abilityBonus(this.wisScore(items));
            case "Arcana":
                return this.abilityBonus(this.intScore(items));
            case "Athletics":
                return this.abilityBonus(this.strScore(items));
            case "Deception":
                return this.abilityBonus(this.chaScore(items));
            case "History":
                return this.abilityBonus(this.intScore(items));
            case "Insight":
                return this.abilityBonus(this.wisScore(items));
            case "Intimidation":
                return this.abilityBonus(this.chaScore(items));
            case "Investigation":
                return this.abilityBonus(this.intScore(items));
            case "Medicine":
                return this.abilityBonus(this.wisScore(items));
            case "Nature":
                return this.abilityBonus(this.intScore(items));
            case "Perception":
                return this.abilityBonus(this.wisScore(items));
            case "Performance":
                return this.abilityBonus(this.chaScore(items));
            case "Persuasion":
                return this.abilityBonus(this.chaScore(items));
            case "Religion":
                return this.abilityBonus(this.intScore(items));
            case "Sleight of Hand":
                return this.abilityBonus(this.dexScore(items));
            case "Stealth":
                return this.abilityBonus(this.dexScore(items));
            case "Survival":
                return this.abilityBonus(this.wisScore(items));
            default:
                return;
        }
    }

    /*
    Multiclassing:

    Add all levels for:
    Bard
    Cleric
    Druid
    Sorceror
    Wizard

    Add half levels (round down) for:
    Paladin
    Ranger

    Add 1/3 levels (round down) for:
    Fighter, Eldritch Knight
    Rogue, Arcane Trickster

    Take the resulting level and reference the multiclassing slot table:

    Lvl  1st  2nd  3rd  4th  5th  6th  7th  8th  9th
    1st   2    -    -    -    -    -    -    -    -
    2nd   3    -    -    -    -    -    -    -    -
    3rd   4    2    -    -    -    -    -    -    -
    4th   4    3    -    -    -    -    -    -    -
    5th   4    3    2    -    -    -    -    -    -
    6th   4    3    3    -    -    -    -    -    -
    7th   4    3    3    1    -    -    -    -    -
    8th   4    3    3    2    -    -    -    -    -
    9th   4    3    3    3    1    -    -    -    -
    10th  4    3    3    3    2    -    -    -    -
    11th  4    3    3    3    2    1    -    -    -
    12th  4    3    3    3    2    1    -    -    -
    13th  4    3    3    3    2    1    1    -    -
    14th  4    3    3    3    2    1    1    -    -
    15th  4    3    3    3    2    1    1    1    -
    16th  4    3    3    3    2    1    1    1    -
    17th  4    3    3    3    2    1    1    1    1
    18th  4    3    3    3    3    1    1    1    1
    19th  4    3    3    3    3    2    1    1    1
    20th  4    3    3    3    3    2    2    1    1
    */

    multiclassSlotTable() {
        var result = [
            [2, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 2, 0, 0, 0, 0, 0, 0, 0],
            [4, 3, 0, 0, 0, 0, 0, 0, 0],
            [4, 3, 2, 0, 0, 0, 0, 0, 0],
            [4, 3, 3, 0, 0, 0, 0, 0, 0],
            [4, 3, 3, 1, 0, 0, 0, 0, 0],
            [4, 3, 3, 2, 0, 0, 0, 0, 0],
            [4, 3, 3, 3, 1, 0, 0, 0, 0],
            [4, 3, 3, 3, 2, 0, 0, 0, 0],
            [4, 3, 3, 3, 2, 1, 0, 0, 0],
            [4, 3, 3, 3, 2, 1, 0, 0, 0],
            [4, 3, 3, 3, 2, 1, 1, 0, 0],
            [4, 3, 3, 3, 2, 1, 1, 0, 0],
            [4, 3, 3, 3, 2, 1, 1, 1, 0],
            [4, 3, 3, 3, 2, 1, 1, 1, 0],
            [4, 3, 3, 3, 2, 1, 1, 1, 1],
            [4, 3, 3, 3, 3, 1, 1, 1, 1],
            [4, 3, 3, 3, 3, 2, 1, 1, 1],
            [4, 3, 3, 3, 3, 2, 2, 1, 1],
        ];

        return result;
    }

    getMulticlassSlots(level) {
        var total = 0;

        this.classes.forEach(function(c) {
            if (c.cls.name.includes("bard")) {
                total += c.level;
            } else if (c.cls.name.includes("cleric")) {
                total += c.level;
            } else if (c.cls.name.includes("druid")) {
                total += c.level;
            } else if (c.cls.name.includes("sorcerer")) {
                total += c.level;
            } else if (c.cls.name.includes("wizard")) {
                total += c.level;
            } else if (c.cls.name.includes("paladin")) {
                total += c.level / 2;
            } else if (c.cls.name.includes("ranger")) {
                total += c.level / 2;
            } else if (c.cls.name.includes("fighter")) {
                this.classFeatures.forEach(function(f) {
                    if (f.name.includes("eldritch knight")) {
                        total += c.level / 3;
                    }
                });
            } else if (c.cls.name.includes("rogue", true)) {
                this.classFeatures.forEach(function(f) {
                    if (f.name.includes("arcane trickster", true)) {
                        total += c.level / 3;
                    }
                });
            }
        });

        if (total === 0) {
            return 0;
        }

        total = total > 20 ? 20 : total;

        return this.multiclassSlotTable()[total - 1][level - 1];
    }

    gainSlotForLevel(level) {
        var limit = this.classes.size > 1
            ? this.getMulticlassSlots(level)
            : this.slotsForLevel(level);
        var playerSlots = this.classes.size > 1
            ? this.multiClassSpellSlots[level]
            : this.spellSlots[level];

        if (playerSlots.available < limit) {
            playerSlots.available++;
        }

        return playerSlots.available;
    }

    spendSlotForLevel(level) {
        var playerSlots = this.classes.size > 1
            ? this.multiClassSpellSlots[level]
            : this.spellSlots[level];

        if (playerSlots.available > 0) {
            playerSlots.available--;
        }

        return playerSlots.available;
    }

    setSlotsForLevel(amount, level) {
        var playerSlots = this.classes.size > 1
            ? this.multiClassSpellSlots[level]
            : this.spellSlots[level];

        if (amount < 0) {
            return;
        }

        playerSlots.available = amount;
    }

    slotsForLevel(level) {
        if (this.classes.size > 1) {
            if (level === 0) {
                return 0;
            }

            return this.getMulticlassSlots(level);
        }

        var charLevel = Math.min(this.level(), 20);

        var slots = "";
        this.classes[0].cls.autolevel.forEach(function(autoLevel) {
            if (parseInt(autoLevel.level, 10) === charLevel && autoLevel.slots) {
                slots = autoLevel.slots;
                return;
            }
        });

        if (slots === "" || level < 1) {
            return 0;
        }

        var levels = slots.split(",");
        if (levels.size <= level) {
            return 0;
        }

        console.log(levels);
        var available = levels[level];
        switch (available) {
            case "":
                return 0;
            case undefined:
                return 0;
            default:
                return parseInt(available.trim(), 10);
        }
    }

    needsSpellPrep() {
        var result = false;
        this.classes.forEach(function(cls) {
            if (
                cls.cls.name.includes("Wizard") ||
                cls.cls.name.includes("Cleric")
            ) {
                result = true;
                return;
            }
        });

        return result;
    }
}

export default Player;
