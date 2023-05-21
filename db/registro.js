const { MongoClient } = require("mongodb")
const configData = require("../utils/configData.json")

const cluster = new MongoClient(configData.MongoKet)
const db = cluster.db("IVM")
const cargosReg = db.collection("configReg")

module.exports = {

    addCargoReg(guild, cargo, name, categoria) {
        cargosReg.updateOne(
            {_id: guild.id}, 
            {$set: { 
                    [`${categoria}.${name}`]: {
                        name: name,
                        cargo_id: cargo.id
                    }
                }
            },
            {upsert: true}
        )
    }

}