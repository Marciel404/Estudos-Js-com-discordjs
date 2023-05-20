const client = require("./utils/loader")
const configData = require("./utils/configData.json")

client.login(configData.token)