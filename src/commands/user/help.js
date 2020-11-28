module.exports.run = async (queries,msg,client,Discord,configFile) => {
    for (const query of queries) {
        msg.channel.send(`${query}`)
    }
}

module.exports.config = {
    name: "eval",
    aliases: ["exec","run"],
    help: {info:"Gets a user's avatar and returns ready to download.",cmd_info:"<users/roles>"}
}