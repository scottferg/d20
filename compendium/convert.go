package main

import (
	"bytes"
	"encoding/json"
	"encoding/xml"
	"flag"
	"log"
	"os"
	"strings"
)

var file = flag.String("filename", "", "file to parse")

type Modifier struct {
	Category string `xml:"category,attr" json:"category"`
	Name     string `xml:",innerxml" json:"modifier"`
}

type Trait struct {
	Name   string   `xml:"name" json:"name"`
	Text   []string `xml:"text" json:"-"`
	Attack string   `xml:"attack" json:"attack,omitempty"`
}

func (t *Trait) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *Trait) MarshalJSON() ([]byte, error) {
	type Alias Trait
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type Action struct {
	Name   string   `xml:"name" json:"name"`
	Text   []string `xml:"text" json:"-"`
	Attack string   `xml:"attack" json:"attack,omitempty"`
}

func (t *Action) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *Action) MarshalJSON() ([]byte, error) {
	type Alias Action
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type Reaction struct {
	Name   string   `xml:"name" json:"name"`
	Text   []string `xml:"text" json:"-"`
	Attack string   `xml:"attack" json:"attack,omitempty"`
}

func (t *Reaction) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *Reaction) MarshalJSON() ([]byte, error) {
	type Alias Reaction
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type Legendary struct {
	Name   string   `xml:"name" json:"name"`
	Text   []string `xml:"text" json:"-"`
	Attack string   `xml:"attack" json:"attack,omitempty"`
}

func (t *Legendary) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *Legendary) MarshalJSON() ([]byte, error) {
	type Alias Legendary
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type Item struct {
	Name      string     `xml:"name" json:"name,omitempty"`
	Type      string     `xml:"type" json:"type,omitempty"`
	Weight    string     `xml:"weight" json:"weight,omitempty"`
	Dmg1      string     `xml:"dmg1" json:"dmg1,omitempty"`
	Dmg2      string     `xml:"dmg2" json:"dmg2,omitempty"`
	DmgType   string     `xml:"dmgType" json:"dmgType,omitempty"`
	Property  string     `xml:"property" json:"property,omitempty"`
	Range     string     `xml:"range" json:"range,omitempty"`
	AC        string     `xml:"ac" json:"ac,omitempty"`
	Strength  string     `xml:"strength" json:"strength,omitempty"`
	Stealth   string     `xml:"stealth" json:"stealth,omitempty"`
	Text      []string   `xml:"text" json:"-"`
	Quantity  string     `xml:"quantity" json:"quantity,omitempty"`
	Equipped  string     `xml:"equipped" json:"equipped,omitempty"`
	Custom    bool       `xml:"custom" json:"custom"`
	Owned     bool       `xml:"owned" json:"owned"`
	Modifiers []Modifier `xml:"modifier" json:"modifier"`
}

func (t *Item) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *Item) MarshalJSON() ([]byte, error) {
	type Alias Item
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type Race struct {
	Name        string     `xml:"name" json:"name"`
	Size        string     `xml:"size" json:"size"`
	Speed       int        `xml:"speed" json:"speed"`
	Ability     string     `xml:"ability" json:"ability"`
	Proficiency string     `xml:"proficiency" json:"proficiency"`
	Traits      []Trait    `xml:"trait" json:"trait"`
	Modifiers   []Modifier `xml:"modifier" json:"modifier"`
}

type ClassFeature struct {
	Optional    string     `xml:"optional" json:"optional"`
	Name        string     `xml:"name" json:"name"`
	Proficiency string     `xml:"proficiency" json:"proficiency"`
	Text        []string   `xml:"text" json:"-"`
	Modifiers   []Modifier `xml:"modifier" json:"modifier"`
}

func (t *ClassFeature) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *ClassFeature) MarshalJSON() ([]byte, error) {
	type Alias ClassFeature
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type AutoLevel struct {
	Level    string         `xml:"level,attr" json:"level"`
	Slots    string         `xml:"slots", json:"slots"`
	Features []ClassFeature `xml:"feature" json:"feature"`
}

type Class struct {
	Name         string      `xml:"name" json:"name"`
	HD           string      `xml:"hd" json:"hd"`
	Proficiency  string      `xml:"proficiency" json:"proficiency"`
	SpellAbility string      `xml:"spellAbility" json:"spellAbility"`
	AutoLevel    []AutoLevel `xml:"autolevel" json:"autolevel"`
}

type Feat struct {
	Name         string   `xml:"name" json:"name"`
	Prerequisite string   `xml:"prerequisite" json:"prerequisite"`
	Text         []string `xml:"text" json:"-"`
}

func (t *Feat) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *Feat) MarshalJSON() ([]byte, error) {
	type Alias Feat
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type Background struct {
	Name        string  `xml:"name" json:"name"`
	Proficiency string  `xml:"proficiency" json:"proficiency"`
	Traits      []Trait `xml:"trait" json:"trait"`
}

type Spell struct {
	Name       string   `xml:"name" json:"name"`
	Level      int      `xml:"level" json:"level"`
	School     string   `xml:"school" json:"school"`
	Ritual     string   `xml:"ritual" json:"ritual"`
	Time       string   `xml:"time" json:"time"`
	Range      string   `xml:"range" json:"range"`
	Components string   `xml:"components" json:"components"`
	Duration   string   `xml:"duration" json:"duration"`
	Classes    string   `xml:"classes" json:"classes"`
	Text       []string `xml:"text" json:"-"`
	Roll       string   `xml:"roll" json:"roll"`
}

func (t *Spell) Description() string {
	buf := &bytes.Buffer{}

	for _, v := range t.Text {
		v = strings.Replace(v, "\t", "<br />", -1)
		buf.WriteString(v)
	}

	return buf.String()
}

func (t *Spell) MarshalJSON() ([]byte, error) {
	type Alias Spell
	return json.Marshal(&struct {
		Description string `json:"description"`
		*Alias
	}{
		Description: t.Description(),
		Alias:       (*Alias)(t),
	})
}

type Monster struct {
	Name            string      `xml:"name" json:"name"`
	Size            string      `xml:"size" json:"size"`
	Type            string      `xml:"type" json:"type"`
	Alignment       string      `xml:"alignment" json:"alignment"`
	AC              string      `xml:"ac" json:"ac"`
	HP              string      `xml:"hp" json:"hp"`
	Speed           string      `xml:"speed" json:"speed"`
	Str             int         `xml:"str" json:"str"`
	Dex             int         `xml:"dex" json:"dex"`
	Con             int         `xml:"con" json:"con"`
	Wis             int         `xml:"wis" json:"wis"`
	Int             int         `xml:"int" json:"int"`
	Cha             int         `xml:"cha" json:"cha"`
	Save            string      `xml:"save" json:"save"`
	Skill           string      `xml:"skill" json:"skill"`
	Resist          string      `xml:"resist" json:"resist"`
	Vulnerable      string      `xml:"vulnerable" json:"vulnerable"`
	Immune          string      `xml:"immune" json:"immune"`
	ConditionImmune string      `xml:"conditionImmune" json:"conditionImmune"`
	Senses          string      `xml:"senses" json:"senses"`
	Passive         int         `xml:"passive" json:"passive"`
	Languages       string      `xml:"languages" json:"languages"`
	Traits          []Trait     `xml:"trait" json:"trait"`
	Actions         []Action    `xml:"action" json:"action"`
	Legendary       []Legendary `xml:"legendary" json:"legendary"`
	Reactions       []Reaction  `xml:"reaction" json:"reaction"`
	Spells          string      `xml:"spells" json:"spells"`
}

type Compendium struct {
	Item       []Item       `xml:"item" json:"items"`
	Race       []Race       `xml:"race" json:"races"`
	Class      []Class      `xml:"class" json:"classes"`
	Feat       []Feat       `xml:"feat" json:"feats"`
	Background []Background `xml:"background" json:"backgrounds"`
	Spell      []Spell      `xml:"spell" json:"spells"`
	Monster    []Monster    `xml:"monster" json:"monsters"`
}

type Output struct {
	Compendium Compendium `json:"compendium"`
}

func init() {
	flag.Parse()
}

func main() {
	f, err := os.Open(*file)
	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	var c Compendium
	err = xml.NewDecoder(f).Decode(&c)
	if err != nil {
		log.Fatal(err)
	}

	enc := json.NewEncoder(os.Stdout)
	enc.SetEscapeHTML(false)

	err = enc.Encode(&Output{c})
	if err != nil {
		log.Fatal(err)
	}
}
