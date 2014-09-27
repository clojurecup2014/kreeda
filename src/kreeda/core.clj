(ns kreeda.core 
  (:require [compojure.core :refer [defroutes GET]]
            [compojure.route :as route]
            [noir.util.middleware :refer [app-handler]]
            [noir.response :as resp]
            [ring.middleware.reload :refer [wrap-reload]]
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

(def app (wrap-reload (app-handler [app-routes api-routes])))
