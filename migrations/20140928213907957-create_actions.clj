;; migrations/20140928213907957-create_actions.clj

(defn up []
  ["create table actions(id serial primary key,
                         name varchar not null,
                         points int not null,
                         application_id int not null,
                         created_at timestamp,
                         updated_at timestamp)"
   "create index actions_application_idx on actions(application_id)"])

(defn down []
  ["drop table actions"])
