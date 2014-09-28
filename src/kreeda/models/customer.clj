(ns kreeda.models.customer
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [clojure.data.json :as json]
            [kreeda.models.utils :refer :all]
            [kreeda.models.application :as application]
            [kreeda.models.entities :refer :all]
            [kreeda.models.base :refer [db]]))


(defn by-provider [provider provider-key provider-meta]
  (let [customers (select customer-identity
                         (with customer)
                         (where {:provider provider :provider_key provider-key}))]
    (if (empty? customers)
      (let [{:keys [login email]} provider-meta
            cust (insert customer 
                         (values (timestamps! {:email email 
                                               :name (:name provider-meta)})))]
        (insert customer-identity
                (values (timestamps! {:provider "github" :provider_key login
                         :provider_meta (json/write-str provider-meta)
                         :customer_id (:id cust)})))
        (by-provider "github" login {}))
      customers)))

(defn by-id [id]
  (select customer
          (with customer-identity)
          (where {:id id})))
