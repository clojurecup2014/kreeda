(ns kreeda.models.application
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [clj-time.core :as t]
            [clojure.data.json :as json]
            [kreeda.models.utils :refer :all]
            [kreeda.models.entities :refer :all]
            [kreeda.models.base :refer [db]]))
(defn uuid [] (java.util.UUID/randomUUID))

(defn by-customer [customer-id]
  (select application
          (where {:customer_id customer-id})))

(defn create [app-name customer-id]
  (insert application
          (values (timestamps! {:api_key (uuid)
                                :api_secret (uuid)
                                :customer_id customer-id
                                :name app-name}))))
(defn by-id [app-id]
  (first (select application
                 (where {:id app-id})
                 (limit 1))))

(defn destroy [app-id]
  (delete application
          (where {:id app-id})))
