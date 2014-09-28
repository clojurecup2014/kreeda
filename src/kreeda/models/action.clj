(ns kreeda.models.action
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [clj-time.core :as t]
            [clojure.data.json :as json]
            [kreeda.models.utils :refer :all]
            [kreeda.models.entities :refer :all]
            [kreeda.models.base :refer [db]]))

(def assignable [:name :points])
(def creatable [:name :points :application_id])
(defn parse [params]
  (-> params
      (assoc :application_id (Integer/parseInt (:application_id params)))))

(defn uuid [] (java.util.UUID/randomUUID))

(defn by-application [application-id]
  (select action
          (where {:application_id application-id})))

(defn create [params]
  (insert action
          (values (timestamps! (-> params 
                                   (parse) 
                                   (select-keys creatable))))))


(defn update-action [action-id params]
  (update action
          (set-fields (touch! (-> params 
                                  (parse) 
                                  (select-keys assignable))))
          (where {:id action-id})))

(defn destroy [action-id]
  (delete action
          (where {:id action-id})))
