(ns kreeda.core 
  (:require [compojure.core :refer [defroutes GET]]
            [compojure.route :as route]
            [noir.util.middleware :refer [app-handler]]
            [kreeda.layout :as layout]))

(defroutes base-routes
  (route/resources "/")
  (route/not-found "Not Found"))



(defroutes app-routes
  (GET "/" [] (layout/render "index.html" {:name "Clojure Cup"})))

(def app (app-handler [app-routes]))
