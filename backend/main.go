package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnRecordCreate("invoices").BindFunc(func(e *core.RecordEvent) error {
		app.RunInTransaction(func(txApp core.App) error {
			var result struct {
				Max int `db:"max"`
			}

			err := txApp.DB().
				NewQuery("SELECT COALESCE(MAX(number), 0) as max FROM invoices").
				One(&result)
			if err != nil {
				return err
			}

			e.Record.Set("number", result.Max+1)
			return nil
		})
		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
