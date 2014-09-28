(ns kreeda.models.base
  (:require [korma.db :refer :all]
            [environ.core :refer [env]]
            [kreeda.models.utils :as utils]
            [korma.core :refer :all]))

(defdb db (postgres {:host (env :pg-host) :port (env :pg-port)
                     :user (env :pg-user) :password (env :pg-pass)
                     :db (env :pg-db-name)
                     :props {:ssl true
                             :sslfactory "org.postgresql.ssl.NonValidatingFactory"}}))
