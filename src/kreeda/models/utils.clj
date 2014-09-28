(ns kreeda.models.utils
  (:require [clj-time.core :as t]))

(defn now [] (java.sql.Date. (.getMillis ^org.joda.time.DateTime (t/now))))

(defn touch! [values]
  (assoc values :updated_at (now)))

(defn timestamps! [values]
  (-> values 
      (assoc :created_at (now))
      touch!))
