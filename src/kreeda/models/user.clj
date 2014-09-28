(ns kreeda.models.user
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [clj-time.core :as t]
            [clojure.data.json :as json]
            [kreeda.models.utils :refer :all]
            [kreeda.models.entities :refer :all]
            [kreeda.models.base :refer [db]]))

(def assignable [:name :email :earned_points :avatar_url])
(def creatable [:name :email :application_id :customer_id :avatar_url])
(defn parse [params]
  (assoc params :customer_id (.toString (:customer_id params))))
(defn create-user [params]
  (insert user
          (values (timestamps! (-> params
                                   (parse)
                                   (select-keys creatable))))))

(defn by-id [user-id]
  (first (select user (where {:id user-id}))))
(defn by-customer-id [app-id customer-id]
  (first (select user (where {:customer_id customer-id
                              :application_id app-id}))))
(defn grant-points [usr points]
  (let [epoints (or (:earned_points usr) 0)]
    (update user
            (set-fields (touch! {:earned_points (+ points epoints)}))
            (where {:id (:id usr)}))))

(defn find-user [params]
  (let [{:keys [application_id customer_id]} (parse params)]
    (first (select user (where {:application_id application_id
                                :customer_id customer_id})))))

(defn update-user [params]
  (update user
          (set-fields (touch! (-> params (parse) (select-keys assignable)))))
  (find-user params))
(defn upsert [params]
  (if (find-user params)
    (update-user params)
    (create-user params)))
