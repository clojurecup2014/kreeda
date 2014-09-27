(defproject kreeda "0.1.0-SNAPSHOT"
  :description "Gamification platform"
  :url "http://kreeda.clojurecup.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :plugins [[clj-sql-up "0.3.3"]
            [lein-ring "0.8.11"]]
  :ring {:handler kreeda.core/app}
  :clj-sql-up {:database "jdbc:postgresql://postgres:pass@127.0.0.1:5432/kreeda_development"
               :database-test "jdbc:postgresql://postgres:pass@127.0.0.1:5432/kreeda_test"
               :deps [[org.postgresql/postgresql "9.3-1100-jdbc4"]]}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [lib-noir "0.8.9"]
                 [selmer "0.7.1"]
                 [environ "1.0.0"]
                 [korma "0.4.0"]
                 [com.cemerick/friend "0.2.0"]
                 [ring/ring-core "1.3.1"]
                 [org.clojure/data.json "0.2.5"]
                 [pghstore-clj "0.1.0"]
                 [clj-time "0.8.0"]
                 [log4j "1.2.15" :exclusions [javax.mail/mail
                                              javax.jms/jms
                                              com.sun.jdmk/jmxtools
                                              com.sun.jmx/jmxri]]
                 [friend-oauth2 "0.1.1"]
                 [org.clojure/core.cache "0.6.3"]
                 [org.postgresql/postgresql "9.3-1100-jdbc4"]])
