(defproject kreeda "0.1.0-SNAPSHOT"
  :description "Gamification platform"
  :url "http://kreeda.clojurecup.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :plugins [[clj-sql-up "0.3.3"]
            [lein-ring "0.8.11"]]
  :ring {:handler kreeda.core/app}
  :clj-sql-up {:database "jdbc:postgresql://postgres@127.0.0.1:5432/cljwebtemplate"
               :database-test "jdbc:postgresql://postgres@127.0.0.1:5432/cljwebtemplate_test"
               :deps [[org.postgresql/postgresql "9.3-1100-jdbc4"]]}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [lib-noir "0.8.9"]
                 [selmer "0.7.1"]
                 [com.cemerick/friend "0.2.0"]
                 [friend-oauth2 "0.1.1"]
                 [org.clojure/core.cache "0.6.3"]
                 [org.postgresql/postgresql "9.3-1100-jdbc4"]])
