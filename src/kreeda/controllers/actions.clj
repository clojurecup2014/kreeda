(ns kreeda.controllers.actions
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [noir.response :as resp]
            [kreeda.models.application :as app-model]
            [kreeda.models.action :as action-model]
            [kreeda.auth :as auth]))

(defn application [req]
  (app-model/by-id (Integer/parseInt (get-in req [:params :application_id]))))


(defn is-own? [req app]
  (let [current-user (auth/current-user req)
        app (application req)]
    (= (:customer_id app) (:id current-user))))

(defmacro do-if-own [req app & body]
  `(if (is-own? ~req ~app)
     (do ~@body)
     (resp/status 401 (resp/json {:message "Mind your own business..."}))))

(defn index-route [req]
  (let [ app (application req)]
    (do-if-own req app
               (resp/json (action-model/by-application (:id app))))))


(defn create-route [req]
  (let [ app (application req)]
    (do-if-own req app
               (resp/json (action-model/create (:params req))))))

(defn update-route [req]
  (let [app (application req)
        action-id (Integer/parseInt (get-in req [:params :id]))]
    (do-if-own req app
               (resp/json (action-model/update-action action-id (:params req))))))

(defn destroy-route [req]
  (let [app (application req)
        action-id (Integer/parseInt (get-in req [:params :id]))]
    (do-if-own req app 
               (action-model/destroy action-id)
               (resp/json {:message "deleted"}))))

(defroutes actions-routes
  (GET "/applications/:application_id/actions" request (auth/authorize (index-route request)))
  (POST "/applications/:application_id/actions" request (auth/authorize (create-route request)))
  (PUT "/applications/:application_id/actions/:id" request (auth/authorize (update-route request)))
  (DELETE "/applications/:application_id/actions/:id" request (auth/authorize (destroy-route request)))
  )

(def app (auth/wrap-authentication actions-routes))
