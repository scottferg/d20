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

    initiative() {
        return this.abilityBonus(this.dexScore()) + this.initiative_mod;
    }

    level() {
        var level = 0;

        this.classes.forEach(function(cls) {
            level += cls.level;
        });

        return level;
    }

    spellDC(ability) {
        var bonus = this.baseAbilityBonus(ability, true);

        bonus += this.proficiencyBonus();
        bonus += this.spellDcBonus();
        bonus += 8;

        return bonus;
    }

    proficiencyBonus() {
        var total = (this.level() - 1) / 4 + 2 + this.proficiency_mod;

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.proficiencyMod();
            }
        });

        return total;
    }

    spellAttackBonus() {
        var total = 0;

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.spellAttackMod();
            }
        });

        return total;
    }

    spellDcBonus() {
        var total = 0;

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.spellDcMod();
            }
        });

        return total;
    }

    acBonus() {
        var total = 0;

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.acMod();
            }
        });

        return total;
    }

    speedBonus() {
        var total = 0;

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.speedMod();
            }
        });

        return total;
    }

    initiativeBonus() {
        var total = 0;

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.initiativeMod();
            }
        });

        return total;
    }

    saveBonus() {
        var total = 0;

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.saveMod();
            }
        });

        return total;
    }

    hpBonus() {
        var total = 0;

        this.items.forEach(function(i) {
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

    strScore() {
        var varue = this.abilityWithRaceMod("str", this.str);

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("strength")) {
                    varue += mod.varue();
                }
            });
        });

        return varue;
    }

    dexScore() {
        var varue = this.abilityWithRaceMod("dex", this.dex);

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("dexterity")) {
                    varue += mod.varue();
                }
            });
        });

        return varue;
    }

    conScore() {
        var varue = this.abilityWithRaceMod("con", this.con);

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("constitution")) {
                    varue += mod.varue();
                }
            });
        });

        return varue;
    }

    intScore() {
        var varue = this.abilityWithRaceMod("int", this.int);

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("intelligence")) {
                    varue += mod.varue();
                }
            });
        });

        return varue;
    }

    wisScore() {
        var varue = this.abilityWithRaceMod("wis", this.wis);

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("wisdom")) {
                    varue += mod.varue();
                }
            });
        });

        return varue;
    }

    chaScore() {
        var varue = this.abilityWithRaceMod("cha", this.cha);

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("charisma")) {
                    varue += mod.varue();
                }
            });
        });

        return varue;
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
        withProficiency = false,
        withRacialMod = true,
        withItemMod = false,
    ) {
        var bonus = this.baseAbilityBonus(ability, withRacialMod);

        bonus += this.saveBonus();

        if (withItemMod) {
            bonus += this.spellAttackBonus();
        }

        if (withProficiency) {
            bonus += this.proficiencyBonus();
            return bonus > 0 ? "+" + bonus + "*" : "" + bonus;
        } else {
            return bonus > 0 ? "+" + bonus : "" + bonus;
        }
    }

    skillScore(skill) {
        switch (skill) {
            case "Acrobatics":
                return this.abilityBonus(this.dexScore());
            case "Animal Handling":
                return this.abilityBonus(this.wisScore());
            case "Arcana":
                return this.abilityBonus(this.intScore());
            case "Athletics":
                return this.abilityBonus(this.strScore());
            case "Deception":
                return this.abilityBonus(this.chaScore());
            case "History":
                return this.abilityBonus(this.intScore());
            case "Insight":
                return this.abilityBonus(this.wisScore());
            case "Intimidation":
                return this.abilityBonus(this.chaScore());
            case "Investigation":
                return this.abilityBonus(this.intScore());
            case "Medicine":
                return this.abilityBonus(this.wisScore());
            case "Nature":
                return this.abilityBonus(this.intScore());
            case "Perception":
                return this.abilityBonus(this.wisScore());
            case "Performance":
                return this.abilityBonus(this.chaScore());
            case "Persuasion":
                return this.abilityBonus(this.chaScore());
            case "Religion":
                return this.abilityBonus(this.intScore());
            case "Sleight of Hand":
                return this.abilityBonus(this.dexScore());
            case "Stealth":
                return this.abilityBonus(this.dexScore());
            case "Survival":
                return this.abilityBonus(this.wisScore());
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
        if (this.spellSlots.size < 10) {
            while (this.spellSlots.size < 10) {
                this.spellSlots.add(SpellSlot(0));
            }
        }

        if (this.multiClassSpellSlots.size < 10) {
            while (this.multiClassSpellSlots.size < 10) {
                this.multiClassSpellSlots.add(SpellSlot(0));
            }
        }

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
        if (this.spellSlots.size < 10) {
            while (this.spellSlots.size < 10) {
                this.spellSlots.add(SpellSlot(0));
            }
        }

        var playerSlots = this.classes.size > 1
            ? this.multiClassSpellSlots[level]
            : this.spellSlots[level];

        if (playerSlots.available > 0) {
            playerSlots.available--;
        }

        return playerSlots.available;
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
        this.classes.forEach(function(c) {
            if (parseInt(c.cls.level, 10) === charLevel && c.cls.slots) {
                slots = c.cls.slots;
            }
        });

        if (slots.isBlank() || level < 1) {
            return 0;
        }

        var levels = slots.split(",");
        if (levels.size <= level) {
            return 0;
        }

        var available = levels[level];
        switch (available) {
            case "":
                return -1;
            default:
                parseInt(available, 10);
        }
    }
}

export default Player;
