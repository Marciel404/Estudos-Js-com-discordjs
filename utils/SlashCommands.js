const { REST, Routes, Collection } = require("discord.js")
const fs = require("fs")
const configData = require("./configData.json")

const rest = new REST().setToken(configData.token);

const commandSlash  = new Collection()

let commands = []

function loadCommands(path) {

    fs.readdir(path, (error, subFolderPath) => {
        fs.readdir(`${path}/${subFolderPath}`, (error, files) => {
            files.forEach((files) => {
                if (files.endsWith(".js")) {
                    let command = require(`.${path}/${subFolderPath}/${files}`)
                    commands.push(command.data.toJSON())
                    commandSlash.set(command.data.name, command)
                }
            })
        })
    })

}

loadCommands("./commands")

async function loadSlash(CLIENT_ID){

    try {
        console.log(`Começando a carregar ${commands.length} Slash Commands.`);

        const data = await rest.put(Routes.applicationCommands(CLIENT_ID),{ body: commands },);

        console.log(`Recarreguei ${data.length} Slash Commands.`);
    } catch (error) {

        console.error(error);
    }
}

module.exports = {loadSlash, commandSlash}
