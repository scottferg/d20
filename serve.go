package main

import (
	"crypto/tls"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/nytimes/gziphandler"
	"golang.org/x/crypto/acme/autocert"
	"golang.org/x/net/http2"
)

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
	log.Fatal(http.ListenAndServe(":80", gziphandler.GzipHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		url := r.URL
		url.Scheme = "https"
		url.Host = "d20.drzaius.io"
		http.Redirect(w, r, url.String(), http.StatusMovedPermanently)
	}))))
}
