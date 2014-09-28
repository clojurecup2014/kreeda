(ns kreeda.controllers.applications
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [noir.response :as resp]
            [kreeda.models.application :as app-model]
            [kreeda.auth :as auth]))

(defn index-route [req]
  (let [current-user (auth/current-user req)
        applications (app-model/by-customer (:id current-user))]
    (resp/json (into [] applications))))

(defn create-route [req]
  (let [current-user (auth/current-user req)
        app-name (get-in req [:body-params :name])]
    (resp/json (app-model/create app-name (:id current-user)))))

(defn show-route [req]
  (let [current-user (auth/current-user req)
        app (app-model/by-id (Integer/parseInt (get-in req [:params :id])))]
    (if (= (:customer_id app) (:id current-user))
      (resp/json app)
      (resp/json {}))))

(defn destroy-route [req]
  (let [current-user (auth/current-user req)
        app (app-model/by-id (Integer/parseInt (get-in req [:params :id])))]
    (if (= (:customer_id app) (:id current-user))
      (do 
        (app-model/destroy (:id app))
        (resp/json {:message "deleted"}))
      (resp/status 401 (resp/json {:message "No........."})))))

    


(defroutes applications-routes
  (GET "/applications" request (auth/authorize (index-route request)))
  (POST "/applications" request (auth/authorize (create-route request)))
  (GET "/applications/:id" request (auth/authorize (show-route request)))
  ;(POST "/applications/:id" [request] (auth/authorize (update-route request)))
  (DELETE "/applications/:id" request (auth/authorize (destroy-route request)))
  )

(def app (auth/wrap-authentication applications-routes))
