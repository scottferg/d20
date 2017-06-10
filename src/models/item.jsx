import React from "react";

export default class Item {
    constructor(item) {
        if (item === undefined) {
            return;
        }

        var that = this;

        Object.keys(item).forEach(function(key) {
            that[key] = item[key];
        });
    }

    dmg1Display() {
        if (this.dmg1) {
            return (
                <p className="item-description"><b>Damage: </b>{this.dmg1}</p>
            );
        }

        return null;
    }

    dmg2Display() {
        if (this.dmg2) {
            return (
                <p className="item-description"><b>Damage: </b>{this.dmg2}</p>
            );
        }

        return null;
    }

    acDisplay() {
        if (this.ac) {
            return <p className="item-description"><b>AC: </b>{this.ac}</p>;
        }

        return null;
    }

    strengthDisplay() {
        if (this.strength) {
            return (
                <p className="item-description">
                    <b>Strength: </b>{this.strength}
                </p>
            );
        }

        return null;
    }

    stealthDisplay() {
        if (this.stealth) {
            return (
                <p className="item-description">
                    <b>Stealth: </b>{this.stealth}
                </p>
            );
        }

        return null;
    }

    weightDisplay() {
        if (this.weight) {
            return (
                <p className="item-description"><b>Weight: </b>{this.weight}</p>
            );
        }

        return null;
    }

    propertyDisplay() {
        if (this.property) {
            return (
                <p className="item-description">
                    <b>Properties: </b>{this.property}
                </p>
            );
        }

        return null;
    }

    descriptionDisplay() {
        if (this.description) {
            return (
                <p
                    className="item-description"
                    dangerouslySetInnerHTML={{
                        __html: "<b>Description: </b>" + this.description,
                    }}
                />
            );
        }

        return null;
    }

    acMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("ac ")) {
                return mod.value();
            }
        });

        return 0;
    }

    damageMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("damage ")) {
                return mod.value();
            }
        });

        return 0;
    }

    attackMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("attacks")) {
                return mod.value();
            }
        });

        return 0;
    }

    saveMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("saving throws")) {
                return mod.value();
            }
        });

        return 0;
    }

    spellAttackMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("spell attack")) {
                return mod.value();
            }
        });

        return 0;
    }

    spellDcMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("spell dc")) {
                return mod.value();
            }
        });

        return 0;
    }

    proficiencyMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("proficiency bonus")) {
                return mod.value();
            }
        });

        return 0;
    }

    hpMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("hp")) {
                return mod.value();
            }
        });

        return 0;
    }

    speedMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("speed")) {
                return mod.value();
            }
        });

        return 0;
    }

    initiativeMod() {
        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.contains("initiative")) {
                return mod.value();
            }
        });

        return 0;
    }

    equippable() {
        return (
            this.type !== "S" &&
            this.type !== "LA" &&
            this.type !== "MA" &&
            this.type !== "HA" &&
            this.type !== "M" &&
            this.type !== "R" &&
            this.type !== "A"
        );
    }

    isWeapon() {
        switch (this.type) {
            case "M":
                return true;
            case "R":
                return true;
            default:
                return false;
        }
    }

    isRangedWeapon() {
        return this.type === "R";
    }

    isMeleeWeapon() {
        return this.type === "M";
    }

    isGear() {
        switch (this.type) {
            case "S":
            case "LA":
            case "MA":
            case "HA":
            case "M":
            case "R":
            case "A":
                return false;
            default:
                return true;
        }
    }

    isAmmo() {
        return this.type === "A";
    }

    isFinesse() {
        if (this.property) {
            return this.property.includes("F");
        }

        return false;
    }

    isArmor() {
        switch (this.type) {
            case "HA":
            case "MA":
            case "LA":
            case "S":
                return true;
            default:
                return false;
        }
    }
}
