package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPing(t *testing.T) {
	t.Run("gets ponged by a ping", func(t *testing.T) {
		request, _ := http.NewRequest(http.MethodGet, "/ping", nil)
		response := httptest.NewRecorder()

		PingHandler(response, request)

		got := response.Body.String()
		want := "pong"

		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})
}
