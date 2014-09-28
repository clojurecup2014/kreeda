(ns kreeda.controllers.sdk
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [noir.response :as resp]
            [noir.session :as session]
            [kreeda.models.user :as user]
            [kreeda.models.application :as app-model]
            [kreeda.models.action :as action-model]
            [kreeda.models.user-action :as user-action-model]
            [kreeda.auth :as auth]))

(defn app-from-headers [request]
  (let [api-key (get-in request [:headers "-x-api-key"])
        api-secret (get-in request [:headers "-x-api-secret"])]
    (app-model/by-key-and-secret api-key api-secret)))

(defn user-from-session []
  (if (session/get :user-id)
    (user/by-id (session/get :user-id))))

(defn upsert-user [request]
  (let [app (app-from-headers request)
        usr (user/upsert (-> (:params request)
                             (assoc :application_id (:id app))))]
    (session/put! :user-id (:id usr))
    (resp/json {:message "done"})))
(defn record-action [request]
  (let [app (app-from-headers request)
        usr (user-from-session)
        axn (action-model/by-name (:id app) 
                                  (get-in request [:body-params :name]))]
    (user-action-model/create {:application_id (:id app)
                               :user_id (:id usr)
                               :action_id (:id axn)
                               :customer_id (:customer_id usr)
                               :action_meta (get-in request [:body-params :meta])})
    (user/grant-points usr (:points axn))
    (resp/json {:message "done"})))



(defroutes sdk-routes 
  (POST "/sdk/users" request (upsert-user request))
  (POST "/sdk/actions" request (record-action request))
  ;(GET "/applications/:application_id/actions" request (auth/authorize (index-route request)))
  ;(POST "/applications/:application_id/actions" request (auth/authorize (create-route request)))
  ;(PUT "/applications/:application_id/actions/:id" request (auth/authorize (update-route request)))
  ;(DELETE "/applications/:application_id/actions/:id" request (auth/authorize (destroy-route request)))
  )

