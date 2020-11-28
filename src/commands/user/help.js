const EmbedCreator = require("../../util/embedcreator.js");

module.exports.run = async (queries,msg,client,Discord,configFile) => {
    if (!queries) return msg.reply("Specify the commands you need help with!");
    for (const query of queries) {
        let command = client.commands.get(query) || client.commands.get(client.aliases.get(query));
        if (!command) { 
            let embed = EmbedCreator.createEmbed({title:"Error",color:configFile.color,
                fields:[{name:"Wrong command:",value:"```"+`'${query}' is not a command!`+"```",isInline:false}]
            });
            msg.channel.send(embed); continue;
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`Help with '${query}'`)
            .setColor(configFile.color)
            .setDescription(`${command.config.help.info}`)
            .addField("How to run:","```"+`${configFile.prefix}${command.config.name} ${command.config.help.cmd_info}`+"```")
            .addField("Aliases:",`${command.config.name}/${command.config.aliases.join("/")}`);
        msg.channel.send(embed);
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h"],
    help: {info:"Gets info about a command and returns it.",cmd_info:"<commands>"}
}