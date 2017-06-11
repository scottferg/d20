package main

import (
	"context"
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"strings"

	"cloud.google.com/go/storage"
	"github.com/gorilla/mux"
	"github.com/nytimes/gziphandler"
	"github.com/rs/cors"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

var (
	debug = flag.Bool("debug", false, "")

	characters = map[string]Character{}
)

type CharacterItem struct {
	Name        string  `json:"name"`
	Classes     []Class `json:"classes"`
	Race        Race    `json:"race"`
	PlayerImage string  `json:"playerImage"`
}

func character(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	if _, ok := characters[vars["character"]]; !ok {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("content-type", "application/json")
	err := json.NewEncoder(w).Encode(characters[vars["character"]])
	if err != nil {
		log.Fatal(err)
	}
}

func characterList(w http.ResponseWriter, r *http.Request) {
	list := make([]CharacterItem, 0, len(characters))
	for _, c := range characters {
		list = append(list, CharacterItem{
			c.Name, c.Classes, c.Race, c.PlayerImage,
		})
	}

	w.Header().Set("content-type", "application/json")
	err := json.NewEncoder(w).Encode(list)
	if err != nil {
		log.Fatal(err)
	}
}

func init() {
	flag.Parse()
}

func main() {
	ctx := context.Background()

	client, err := storage.NewClient(ctx, option.WithServiceAccountFile("cloud-storage.json"))
	if err != nil {
		log.Fatal(err)
	}

	it := client.Bucket("d20-drzaius-io").Objects(ctx, nil)

	for {
		objAttrs, err := it.Next()
		if err == iterator.Done {
			break
		}

		if err != nil {
			log.Println(err)
		}

		r, err := client.Bucket("d20-drzaius-io").Object(objAttrs.Name).NewReader(ctx)
		if err != nil {
			log.Println(err)
			continue
		}

		var c []Character
		err = json.NewDecoder(r).Decode(&c)
		if err != nil {
			log.Fatal(err)
		}

		for _, character := range c {
			log.Println(strings.ToLower(character.Name))
			characters[strings.ToLower(character.Name)] = character
		}
	}

	r := mux.NewRouter()
	r.Handle("/c/{character}", gziphandler.GzipHandler(http.HandlerFunc(character)))
	r.Handle("/c", gziphandler.GzipHandler(http.HandlerFunc(characterList)))
	r.PathPrefix("/").Handler(gziphandler.GzipHandler(http.FileServer(http.Dir("build"))))

	handler := cors.Default().Handler(r)

	if *debug {
		log.Fatal(http.ListenAndServe(":8080", handler))
	} else {
		go serveRedirect()
		log.Fatal(serveTLS(handler))
	}
}
