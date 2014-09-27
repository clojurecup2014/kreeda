(ns kreeda.core 
  (:require [compojure.core :refer [defroutes GET]]
            [compojure.route :as route]
            [noir.util.middleware :refer [app-handler]]
            [noir.response :as resp]
            [ring.middleware.session.cookie :as c]
            [ring.middleware.reload :refer [wrap-reload]]
            [kreeda.auth :as auth]
            [kreeda.layout :as layout]))

(defroutes base-routes
  (route/resources "/")
  (route/not-found "Not Found"))



(defroutes app-routes
  (GET "/" [] (layout/render "index.html" {:name "Clojure Cup"})))

(defonce apps [{:id 1 :key "key1" :secret "secret" :user_id 1}
               {:id 3 :key "key3" :secret "secret" :user_id 1}
               {:id 2 :key "key2" :secret "secret" :user_id 1}])
(defroutes api-routes
  (GET "/apps" [] (resp/json apps)))

(def app 
  (app-handler [auth/app app-routes api-routes] 
               :session-options {:cookie-attrs {:max-age (* 60 60 24 365)} :store (c/cookie-store {:key "1C1D1E101A2B2C2D"} )}))
