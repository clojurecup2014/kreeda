(ns kreeda.core 
  (:require [compojure.core :refer [defroutes GET]]
            [compojure.route :as route]
            [noir.util.middleware :refer [app-handler]]
            [noir.response :as resp]
            [environ.core :refer [env]]
            [ring.middleware.session.cookie :as c]
            [ring.middleware.reload :refer [wrap-reload]]
            [cemerick.friend :as friend]
            [kreeda.auth :as auth]
            [kreeda.layout :as layout]))

(defroutes base-routes
  (route/resources "/")
  (route/not-found "Not Found"))

(defroutes app-routes
  (GET "/" [request] (layout/render "index.html" {:name "Clojure Cup"
                                                  :current-user (auth/current-user request)}))
  (GET "/auth/github" request (auth/authorize (resp/redirect  "/app")))
  (GET "/app" request (layout/render "app.html" {:current_user (auth/current-user request)}))
  )

(defonce apps [{:id 1 :key "key1" :secret "secret" :user_id 1}
               {:id 3 :key "key3" :secret "secret" :user_id 1}
               {:id 2 :key "key2" :secret "secret" :user_id 1}])
(defroutes api-routes
  (GET "/github" request (auth/authorize (resp/json (auth/current-user request))))
  (GET "/apps" [] (resp/json apps)))

(def app (wrap-reload
           (app-handler [(auth/wrap-authentication app-routes) 
                         (auth/wrap-authentication api-routes) base-routes] 
                        :session-options {:cookie-attrs {:max-age (* 60 60 24 365)} 
                                          :store (c/cookie-store {:key (env :cookie-secret)} )})))
