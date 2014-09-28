(ns kreeda.models.user-action
  (:require [korma.db :refer :all]
            [korma.core :refer :all]
            [clj-time.core :as t]
            [clojure.data.json :as json]
            [kreeda.models.utils :refer :all]
            [kreeda.models.entities :refer :all]
            [kreeda.models.base :refer [db]]))

;(def assignable [:name :email :earned_points :avatar_url])
(def creatable [:application_id :user_id :action_id :customer_id :action_meta])

(defn parse [params]
  (assoc params :action_meta (json/write-str (:action_meta params))))

(defn create [params]
  (insert user-action
          (values (timestamps! (-> params
                                   (parse)
                                   (select-keys creatable))))))
