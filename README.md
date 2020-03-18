# EFREI-bot

## About
This repo is the base repository for all the firebase functions used in the action on google EFREI bot.
The bot has for purpose to respond and give any information that might be needed for somone intersted by the school EFREI Paris.

## Developement
### Requierements
You will need to install all those sofwear to be able to test and work on those functions.
- NodeJS
- NPM
- TypeScript installed globaly (refer to the TypeScript [documentation](https://www.typescriptlang.org/docs/home.html) if needed)

### Code and tests
You have to be inside the `function` folder to work on the functions
1. Make sure to install all dependency with `npm install`
2. Build your code with `npm run build` as specified in the `package.json` files

Unfortunatlly I've not found a solution yet to test your function other thant deploying it to **firebse** and test it with the Google Assistant by asking: "parler avec EFREI Paris" (the action is only avalable in french for now)

### Notes
You will not be able to deploy your functions if you have not been aprouved by **Thibault LEPEZ** the administrator of the firebase project, and the administrator of the action on Google project
