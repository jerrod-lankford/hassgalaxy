# Hass Galaxy
Hass galaxy is a credential sharing companion app for the UI for Home Assistant app on samsung galaxy watches. https://github.com/Jerrkawz/HAGearS3

## FAQ
Is it secure?
Yes. No credentials are saved at all. A websocket is opened up on the watch and the server simply forwards credentials inputed to the watch web socket. No databases involved.

What if I dont feel comfortable using this?
Then don't. If it makes you feel better you can share just the token to the watch and then fill out the server url manually. If you still don't feel comfortable sharing your generated token then you can always sideload the watch app from source with hardcoded credentials. Instructions coming soon.

