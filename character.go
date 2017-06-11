package main

type Trait struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Modifier struct {
	Name     string `json:"name"`
	Category string `json:"category"`
}

type Background struct {
	Name        string  `json:"name"`
	Proficiency string  `json:"proficiency"`
	Traits      []Trait `json:"traits"`
}

type ClassFeature struct {
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Optional    string     `json:"optional"`
	Modifiers   []Modifier `json:"modifiers"`
	Proficiency string     `json:"proficiency"`
}

type Level struct {
	Features []ClassFeature `json:"features"`
	Level    string         `json:"level"`
	Slots    string         `json:"slots"`
}

type Class struct {
	Cls struct {
		HitDice      int     `json:"hitDice"`
		Levels       []Level `json:"levels"`
		Name         string  `json:"name"`
		Proficiency  string  `json:"proficiency"`
		SpellAbility string  `json:"spellAbility"`
	} `json:"cls"`
	Level int `json:"level"`
}

type HitDice struct {
	Name      string `json:"name"`
	Available int    `json:"available"`
}

type Item struct {
	AC          int    `json:"ac"`
	Custom      bool   `json:"custom"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Dmg1        string `json:"dmg1"`
	Dmg2        string `json:"dmg2"`
	DmgType     string `json:"dmgType"`
	Equipped    string `json:"equipped"`
	Owned       bool   `json:"owned"`
	Property    string `json:"property"`
	Quantity    int    `json:"quantity"`
	Range       string `json:"range"`
	Stealth     string `json:"stealth"`
	Strength    string `json:"strength"`
	Type        string `json:"type"`
	Weight      string `json:"weight"`
}

type Note struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Skill struct {
	Name       string `json:"name"`
	Proficient bool   `json:"proficient"`
}

type Race struct {
	Ability     string     `json:"ability"`
	Name        string     `json:"name"`
	Modifiers   []Modifier `json:"modifiers"`
	Proficiency string     `json:"proficiency"`
	Size        string     `json:"size"`
	Speed       int        `json:"speed"`
	Traits      []Trait    `json:"traits"`
}

type Slot struct {
	Available int `json:"available"`
}

type Spell struct {
	Classes     string `json:"classes"`
	Components  string `json:"components"`
	Description string `json:"description"`
	Duration    string `json:"duration"`
	Level       int    `json:level"`
	Name        string `json:"name"`
	Prepared    bool   `json:"prepared"`
	Range       string `json:"range"`
	Ritual      string `json:"ritual"`
	Roll        string `json:"roll"`
	School      string `json:"school"`
	Time        string `json:"time"`
}

type Character struct {
	Name          string         `json:"name"`
	AcMod         int            `json:"ac_mod"`
	Background    Background     `json:"background"`
	ClassFeatures []ClassFeature `json:"classFeatures"`
	Classes       []Class        `json:"classes"`
	HitDice       []HitDice      `json:"hitDice"`
	HP            int            `json:"hp"`
	InitiativeMod int            `json:"initiative_mod"`
	Inspiration   int            `json:"inspiration"`
	Items         []Item         `json:"items"`
	MaxHP         int            `json:"max_hp"`
	Money         struct {
		CP int `json:"cp"`
		EP int `json:"ep"`
		GP int `json:"gp"`
		PP int `json:"pp"`
		SP int `json:"sp"`
	} `json:"Money"`
	MultiClassSpellSlots []Slot  `json:"multiClassSpellSlots"`
	Notes                []Note  `json:"notes"`
	PlayerImage          string  `json:"playerImage"`
	ProficiencyMod       int     `json:"proficiency_mod"`
	Race                 Race    `json:"race"`
	RolledHP             int     `json:"rolled_hp"`
	Skills               []Skill `json:"skills"`
	SpeedMod             int     `json:"speed_mod"`
	SpellSlots           []Slot  `json:"spellSlots"`
	Spells               []Spell `json:"spells"`
	TempHP               int     `json:"temp_hp"`
	XP                   int     `json:"xp"`

	CHA int `json:"cha"`
	CON int `json:"con"`
	DEX int `json:"dex"`
	INT int `json:"int"`
	STR int `json:"str"`
	WIS int `json:"wis"`
}
