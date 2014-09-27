(ns kreeda.models.base
  (:require [korma.db :refer :all]
            [environ.core :refer [env]]
            [kreeda.models.utils :as utils]
            [korma.core :refer :all]))

(defdb db (postgres {:host (or (env "pg-host") "localhost")
                     :port (or (env "pg-port") 5432)
                     :db (or (env "pg-db-name") "kreeda_development")
                     :user (or (env "pg-user") "postgres")
                     :password (or (env "pg-pass") "pass")
                     :props {:ssl true
                             :sslfactory "org.postgresql.ssl.NonValidatingFactory"}}))
