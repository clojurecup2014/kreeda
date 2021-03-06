(ns kreeda.auth
  (:require [compojure.core :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [cemerick.friend :as friend]
            [clojure.pprint :refer [pprint]]
            [cheshire.core :as j]
            [clj-http.client :as client]
            [friend-oauth2.workflow :as oauth2]
            [environ.core :refer [env]]
            [kreeda.models.customer :as customer]
            [friend-oauth2.util :refer [format-config-uri get-access-token-from-params]]
            (cemerick.friend [workflows :as workflows]
                             [credentials :as creds])))


(def config-auth {:roles #{::user}})

(def client-config
  {:client-id (env :gh-client-id)
   :client-secret (env :gh-client-secret)
   :callback {:domain (env :deploy-domain) :path "/oauth2callback"}})

(def uri-config
  {:authentication-uri {:url "https://github.com/login/oauth/authorize"
                        :query {:client_id (:client-id client-config)
                                :response_type "code"
                                :redirect_uri (format-config-uri client-config)
                                :scope "user"}}

   :access-token-uri {:url "https://github.com/login/oauth/access_token"
                      :query {:client_id (:client-id client-config)
                              :client_secret (:client-secret client-config)
                              :grant_type "authorization_code"
                              :redirect_uri (format-config-uri client-config)}}})


(defn get-github-user
  "Make a call to get github user"
  [access-token]
  (let [url (str "https://api.github.com/user?access_token=" access-token)
        response (client/get url {:accept :json})
        user (j/parse-string (:body response) true)]
    user))

(defn credential-fn
  [token]
  ;;lookup token in DB or whatever to fetch appropriate :roles
  (let [ access-token (:access-token token)
        user (get-github-user access-token)
        customer (first (customer/by-provider "github" (:login user) user))]
    {:identity {:access-token access-token  :customer-id (:customer_id customer)} :roles #{::user}}))

(defn wrap-authentication [ring-app]
  (friend/authenticate
    ring-app
    {:allow-anon? true
     :workflows [(oauth2/workflow
                   {:client-config client-config
                    :uri-config uri-config
                    :access-token-parsefn get-access-token-from-params
                    :credential-fn credential-fn
                    :config-auth config-auth})]}))

(defn current-user
  [request]
  (let [authentications (get-in request [:session :cemerick.friend/identity :authentications])
        access-token (:access-token (first (first authentications)))
        customer-id (:customer-id (first (first authentications)))]
    (if customer-id
        (first (customer/by-id customer-id)))))

(defmacro authorize [& body]
  `(friend/authorize #{::user} ~@body))
