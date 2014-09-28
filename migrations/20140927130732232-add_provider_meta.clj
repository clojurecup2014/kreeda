;; migrations/20140927130732232-add_provider_meta.clj

(defn up []
  ["alter table identities add column provider_meta text"])

(defn down []
  ["alter table identities drop column provider_meta"])
