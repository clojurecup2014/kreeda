;; migrations/20140927044751587-create-apps.clj

(defn up []
  ["create table applications(id serial primary key,
                              name varchar not null,
                              api_key varchar not null,
                              api_secret varchar not null,
                              customer_id integer not null,
                              created_at timestamp,
                              updated_at timestamp)"
   
   "create index app_key_secret_idx on applications(api_key,api_secret)"
   "create index app_customer_indx on applications(customer_id)"])

(defn down []
  ["drop table applications"])
