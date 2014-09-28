# Introduction to kreeda

Kreeda is a app which takes away the pain of gamifying your system. Built as part of ClojureCup 2014.

# Javascript SDK
<script src=“http://kreeda.clojurecup.com/assets/js/sdk.js”></script>
Kreeda.createOrUpdateUser({username: “name”, uid: uid, avatar: “image”})
Kreeda.publishAction({action: metadata})
Kreeda.init({appId: “appid”, secret: “secret”})
Kreeda.showBadges(domElement)
Kreeda.showLeaderBoard(domElement)

# Objects

-- Auth Related

Customer(id, timestamps)
App(id, key, secret, url, customer_id, timestamps)
CustomerIdentities(id, provider, customer_id, provider_id, provider_json, timestamps)


-- Domain
Action(id, name, app_id, points)
Level(id, name, app_id, points_from, points_to)
Trophy(id, name, app_id, trophy_img_url, rules json)

User(id, app_id, client_id, name, email, avatar_url, earned_points, timestamps)

UserActions(id, action_id, app_id, client_user_id, action_meta_data json, timestamps)
UserTrophies(id, user_id, trophy_id, app_id, timestamps)

# API endpoints

Restful

 * `/current_user`
 * `/applications`
 * `/applications/:id/actions`
 * `/applications/:id/levels`
 * `/applications/:id/trophies`
