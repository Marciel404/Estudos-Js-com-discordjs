const { REST, Routes, Collection } = require("discord.js")
const fs = require("fs")
const configData = require("./configData.json")

const rest = new REST().setToken(configData.token);

const commandSlash  = new Collection()

let commands = []

function loadCommands(path) {
    try {

        fs.readdir(path, (error, subFolderPath) => {
            for (const name of subFolderPath){
                fs.readdir(`${path}/${[name]}`, (error, files) => {
                    files.forEach((files) => {
                        if (files.endsWith(".js")) {
                            let command = require(`.${path}/${name}/${files}`)
                            commands.push(command.data.toJSON())
                            commandSlash.set(command.data.name, command)
                        }
                    })
                })
            }
        })

    } catch (err) {
        console.log(err)
    }

}

loadCommands("./commands")

async function loadSlash(CLIENT_ID){

    try {
        console.log(`Começando a carregar ${commands.length} Slash Commands.`);

        const data = await rest.put(Routes.applicationCommands(CLIENT_ID),{ body: commands },);

        console.log(`Recarreguei ${data.length} Slash Commands.`);
    } catch (error) {

        console.log(error);
    }
}

module.exports = {loadSlash, commandSlash}
