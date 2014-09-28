(ns kreeda.models.entities
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [kreeda.models.base :refer [db]]))

(declare customers customer-identity application action user
         user-action)
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
  (has-many user {:fk :application_id})
  (has-many user-action {:fk :application_id})
  (belongs-to customer {:fk :customer_id}))

(defentity action
  (table :actions)
  (has-many user-action {:fk :action_id})
  (belongs-to application {:fk :application_id}))

(defentity user
  (table :users)
  (has-many user-action {:fk :user_id})
  (belongs-to application {:fk :application_id}))

(defentity user-action
  (table :user_actions)
  (belongs-to user {:fk :user_id})
  (belongs-to application {:fk :application_id})
  (belongs-to action {:fk :action_id}))

