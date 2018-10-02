# rocketman

## Features
* Replicate your Phabricator feed in a Rocket.chat channel
* Links for Differential, Diffusion, Phame and Maniphest objects

## Instructions to setup
( You need to be an administrator in both Phabricator and Rocket.chat instances)
1. Create a new Integration in Rocket.chat
    1. Goto `Administration` -> `Integrations`
    2. Click on `New Integration` and choose `Incoming Webhook`
    3. Fill in the details and click `Save Changes`
    4. Copy `Webhook URL` from the integration details page (This will be of the form *http://chat.example.com/hooks/abc/def*)
2. Update the variables `PHABRICATOR_ROOT_URL` and `LAST_BLOG_ID` in the `bot.js` file
3. Open your newly created Rocket.chat integration and paste the contents of `bot.js` file into the `Script` field
4. Update your Phabricator config
    1. Goto your phabricator directory (i.e `phabricator/`, make sure the directory has the file `LICENSE` and the folder `webroot` and `bin`)
    2. Execute `./bin/config set feed.http-hooks '["http://chat.example.com/hooks/abc/def"]'` (Use the `Webhook URL` copied in the step *1.iv*)

## TODO
* [ ] Use Confluence API to show the exact link of the comment instead of the link of the parent object
* [ ] Remove the `LAST_BLOG_ID` variable and use Confluence API to fetch the blog link
* [ ] Ping a Rocket.chat user (using @mention) when an issue is assigned to the user
* [ ] Fetch callsigns of all repositories to improve Diffusion regex
