import Item from './item'

class Player {
    constructor(player) {
        if (player === undefined) {
            return;
        }

        var that = this;

        Object.keys(player).forEach(function(key) {
            that[key] = player[key];
        })
    }

    checkProficiency(save) {
        var result = false;
        this.classes.forEach(function(cls) {
            if (cls.cls.proficiency.includes(save)) {
                result = true;
            }
        })

        return result;
    }

    initiative() {
        return this.abilityBonus(this.dexScore()) + this.initiative_mod
    }

    level() {
        var level = 0

        this.classes.forEach(function(cls) {
            level += cls.level
        })

        return level
    }

    spellDC(ability) {
        var bonus = this.baseAbilityBonus(ability, true);

        bonus += this.proficiencyBonus();
        bonus += this.spellDcBonus();
        bonus += 8;

        return bonus;
    }

    proficiencyBonus() {
        var total = (((this.level() - 1) / 4) + 2) + this.proficiency_mod

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.proficiencyMod()
            }
        })

        return total
    }

    spellAttackBonus() {
        var total = 0

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.spellAttackMod()
            }
        })

        return total
    }

    spellDcBonus() {
        var total = 0

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.spellDcMod()
            }
        })

        return total
    }

    acBonus() {
        var total = 0

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.acMod()
            }
        })

        return total
    }

    speedBonus() {
        var total = 0

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.speedMod()
            }
        })

        return total
    }

    initiativeBonus() {
        var total = 0

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.initiativeMod()
            }
        })

        return total
    }

    saveBonus() {
        var total = 0

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.saveMod()
            }
        })

        return total
    }

    hpBonus() {
        var total = 0

        this.items.forEach(function(i) {
            var item = new Item(i);

            if (item.equipped !== "Unequipped" || !item.equippable()) {
                total += item.hpMod()
            }
        })

        return total
    }

    passivePerception() {
        var bonus = 10 + this.abilityBonus(this.wisScore())

        if (this.skills[11].proficient) {
            bonus += this.proficiencyBonus()
        }

        return bonus
    }

    abilityBonus(ability) {
        return Math.ceil((ability - 9.5) / 2.0) - 1
    }

    abilityWithRaceMod(ability, base) {
        var abilities = this.race.ability.split(", ")

        var i = 0

        while (i < abilities.length) {
            var values = abilities[i].split(" ")

            if (values[0].toLowerCase() === ability) {
                return base + parseInt(values[1]);
            }

            i++
        }

        return base
    }

    strScore() {
        var value = this.abilityWithRaceMod("str", this.str)

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("strength")) {
                    value += mod.value()
                }
            })
        })

        return value
    }

    dexScore() {
        var value = this.abilityWithRaceMod("dex", this.dex)

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("dexterity")) {
                    value += mod.value()
                }
            })
        })

        return value
    }

    conScore() {
        var value = this.abilityWithRaceMod("con", this.con)

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("constitution")) {
                    value += mod.value()
                }
            })
        })

        return value
    }

    intScore() {
        var value = this.abilityWithRaceMod("int", this.int)

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("intelligence")) {
                    value += mod.value()
                }
            })
        })

        return value
    }

    wisScore() {
        var value = this.abilityWithRaceMod("wis", this.wis)

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("wisdom")) {
                    value += mod.value()
                }
            })
        })

        return value
    }

    chaScore() {
        var value = this.abilityWithRaceMod("cha", this.cha)

        this.items.forEach(function(item) {
            if (item.modifiers === undefined) {
                return;
            }

            item.modifiers.forEach(function(mod) {
                if (mod.name.includes("charisma")) {
                    value += mod.value()
                }
            })
        })

        return value
    }

    baseAbilityBonus(ability, withRacialMod = true) {
        switch (ability) {
            case "str": 
                return this.abilityBonus(withRacialMod ? this.strScore() : this.str)
            case "dex": 
                return this.abilityBonus(withRacialMod ? this.dexScore() : this.dex)
            case "con": 
                return this.abilityBonus(withRacialMod ? this.conScore() : this.con)
            case "int": 
                return this.abilityBonus(withRacialMod ? this.intScore() : this.int)
            case "wis": 
                return this.abilityBonus(withRacialMod ? this.wisScore() : this.wis)
            case "cha": 
                return this.abilityBonus(withRacialMod ? this.chaScore() : this.cha)
            default:
                return this.abilityBonus(0);
        }
    }

    formatAbilityBonus(ability, withProficiency = false, withRacialMod = true, withItemMod = false) {
        var bonus = this.baseAbilityBonus(ability, withRacialMod)

        bonus += this.saveBonus()

        if (withItemMod) {
            bonus += this.spellAttackBonus()
        }

        if (withProficiency) {
            bonus += this.proficiencyBonus()
            return bonus > 0 ? ("+" + bonus + "*") : ("" + bonus)
        } else {
            return bonus > 0 ? ("+" + bonus) : ("" + bonus)
        }
    }

    skillScore(skill) {
        switch(skill) {
            case "Acrobatics": return this.abilityBonus(this.dexScore())
            case "Animal Handling": return this.abilityBonus(this.wisScore())
            case "Arcana": return this.abilityBonus(this.intScore())
            case "Athletics": return this.abilityBonus(this.strScore())
            case "Deception": return this.abilityBonus(this.chaScore())
            case "History": return this.abilityBonus(this.intScore())
            case "Insight": return this.abilityBonus(this.wisScore())
            case "Intimidation": return this.abilityBonus(this.chaScore())
            case "Investigation": return this.abilityBonus(this.intScore())
            case "Medicine": return this.abilityBonus(this.wisScore())
            case "Nature": return this.abilityBonus(this.intScore())
            case "Perception": return this.abilityBonus(this.wisScore())
            case "Performance": return this.abilityBonus(this.chaScore())
            case "Persuasion": return this.abilityBonus(this.chaScore())
            case "Religion": return this.abilityBonus(this.intScore())
            case "Sleight of Hand": return this.abilityBonus(this.dexScore())
            case "Stealth": return this.abilityBonus(this.dexScore())
            case "Survival": return this.abilityBonus(this.wisScore())
            default: return;
        }
    }
}

export default Player;
