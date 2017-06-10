package main

import (
	"crypto/tls"
	"encoding/json"
	"flag"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/rs/cors"

	"golang.org/x/crypto/acme/autocert"
	"golang.org/x/net/http2"
)

var (
	debug = flag.Bool("debug", false, "")
)

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

func serveTLS(handler http.Handler) error {
	const cacheDir = "/var/cache/autocert"
	if err := os.MkdirAll(cacheDir, 0700); err != nil {
		return err
	}

	m := autocert.Manager{
		Cache:      autocert.DirCache(cacheDir),
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist("d20.drzaius.io"),
	}

	srv := &http.Server{
		Handler: handler,
		TLSConfig: &tls.Config{
			GetCertificate: m.GetCertificate,
		},
	}

	http2.ConfigureServer(srv, &http2.Server{
		NewWriteScheduler: func() http2.WriteScheduler {
			return http2.NewPriorityWriteScheduler(nil)
		},
	})

	ln, err := net.Listen("tcp", ":443")
	if err != nil {
		return err
	}

	return srv.Serve(tls.NewListener(tcpKeepAliveListener{ln.(*net.TCPListener)}, srv.TLSConfig))
}

type tcpKeepAliveListener struct {
	*net.TCPListener
}

func (ln tcpKeepAliveListener) Accept() (c net.Conn, err error) {
	tc, err := ln.AcceptTCP()
	if err != nil {
		return
	}

	tc.SetKeepAlive(true)
	tc.SetKeepAlivePeriod(3 * time.Minute)
	return tc, nil
}

func serveRedirect() {
	log.Fatal(http.ListenAndServe(":80", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		url := r.URL
		url.Scheme = "https"
		url.Host = "d20.drzaius.io"
		http.Redirect(w, r, url.String(), http.StatusMovedPermanently)
	})))
}

func init() {
	flag.Parse()
}

func main() {
	f, err := os.Open("player_export.json")
	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	var c []Character
	err = json.NewDecoder(f).Decode(&c)
	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/character", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("content-type", "application/json")
		err = json.NewEncoder(w).Encode(c[0])
		if err != nil {
			log.Fatal(err)
		}
	})
	mux.Handle("/", http.FileServer(http.Dir("build")))

	handler := cors.Default().Handler(mux)

	if *debug {
		log.Fatal(http.ListenAndServe(":8080", handler))
	} else {
		go serveRedirect()
		log.Fatal(serveTLS(handler))
	}
}
