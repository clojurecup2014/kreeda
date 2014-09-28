(ns kreeda.models.entities
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [kreeda.models.base :refer [db]]))

(declare customers customer-identity application action)
(defentity customer
  (table :customers)
  (has-many application {:fk :customer_id})
  (has-many customer-identity {:fk :customer_id}))

(defentity customer-identity
  (table :identities)
  (belongs-to customer {:fk :customer_id}))

(defentity application
  (table :applications)
  (has-many action {:fk :application_id})
  (belongs-to customer {:fk :customer_id}))

(defentity action
  (table :actions)
  (belongs-to application {:fk :application_id}))
