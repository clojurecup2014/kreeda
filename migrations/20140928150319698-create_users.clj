;; migrations/20140928150319698-create_users.clj

(defn up []
  ["create table users(id serial primary key,
                       application_id integer,
                       customer_id varchar,
                       name varchar,
                       email varchar,
                       avatar_url varchar,
                       earned_points int,
                       created_at timestamp,
                       updated_at timestamp)"
   "create index users_application_idx on users(application_id)"])

(defn down []
  ["drop table users"])
