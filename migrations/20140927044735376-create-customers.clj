;; migrations/20140927044735376-create-customers.clj

(defn up []
  ["create table customers(id serial primary key, 
                           name varchar,
                           email varchar,
                           created_at timestamp,
                           updated_at timestamp)"
   "create table identities (id serial primary key,
                             provider varchar not null,
                             provider_key varchar not null,
                             customer_id integer not null,
                             access_token varchar,
                             created_at timestamp,
                             updated_at timestamp)"
   "create index identities_provider_idx on identities(provider,provider_key)"
   "create index identities_customer_idx on identities(customer_id)"
   ])

(defn down []
  ["drop table identities" "drop table customers"])
