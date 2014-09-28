;; migrations/20140928162758145-create-user-actions.clj

(defn up []
  ["create table user_actions(id serial primary key,
                              application_id int,
                              user_id int,
                              customer_id varchar,
                              action_id int,
                              action_meta text,
                              created_at timestamp,
                              updated_at timestamp)"
   "create index user_actions_app_idx on user_actions(application_id)"
   "create index user_actions_action_idx on user_actions(action_id)"
   "create index user_actions_user_idx on user_actions(user_id)"])

(defn down []
  ["drop table user_actions"])
