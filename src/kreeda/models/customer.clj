(ns kreeda.models.customer
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [clj-time.core :as t]
            [clojure.data.json :as json]
            [kreeda.models.base :refer [db]]))

(declare customers customer-identity)
(defn now [] (java.sql.Date. (.getMillis ^org.joda.time.DateTime (t/now))))
(defentity customer
  (table :customers)
  (has-many customer-identity))

(defentity customer-identity
  (table :identities)
  (belongs-to customer {:fk :customer_id}))

(defn by-provider [provider provider-key provider-meta]
  (let [customers (select customer-identity
                         (with customer)
                         (where {:provider provider :provider_key provider-key}))]
    (if (empty? customers)
      (let [{:keys [login email]} provider-meta
            cust (insert customer 
                             (values {:email email :name (:name provider-meta) 
                                      :created_at (now) 
                                      :updated_at (now)}))]

        (insert customer-identity
                (values {:provider "github" :provider_key login
                         :created_at (now) 
                         :updated_at (now)
                         :customer_id (:id cust)}))
        (by-provider "github" login {}))
      customers)))
