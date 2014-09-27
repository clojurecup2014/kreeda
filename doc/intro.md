# Introduction to kreeda

Kreeda is a app which takes away the pain of gamifying your system. Built as part of ClojureCup 2014.

# Objects

-- Auth Related

App(id, appid, appsecret, url, user_id, timestamps)
User(id, timestamps)
UserIdentities(id, provider, user_id, provider_id, provider_json, timestamps)


-- Domain
Action(id, name, app_id, points)
Level(id, name, app_id, points_from, points_to)
Trophy(id, name, app_id, trophy_img_url, rules json)
