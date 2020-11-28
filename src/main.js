// setup
const Discord = require("discord.js"); // discord.js
const client = new Discord.Client(); // the bot
const configFile = require("../config.json"); // configuration file
const status = require("./status.js"); // status module
const { readdir, lstat } = require("fs").promises; // fs module (to handle file selection)
const { join } = require("path"); // path module (to resolve paths)

client.commands = new Map(); // all the possible commands that a user can do
client.aliases = new Map(); // all the possible aliases for the commands

// code
(async function logCommands(dir="commands"){ // to log all commands into client.commands (fancy command handler)
    let files = await readdir(join(__dirname,dir)); // read the ./commands directory
    for (const file of files){ // for each file on ./commands
        let stat = await lstat(join(__dirname, dir, file)); // get the file path
        if (stat.isDirectory()){ // if file is a directory
            logCommands(join(dir, file)); // log the commands who are inside subdirs (or subsubdirs, subsubsubdirs, etc)
        } else {
            if (file.endsWith(".js")){ // if the file is a javascript file
                let commandName = file.substring(0, file.indexOf(".js")); // the name of the command
                let commandModule = require(join(__dirname,dir,file)); // the path of the command inside of the project
                client.commands.set(commandName,commandModule); // create a value referencing the command inside the map

                commandModule.config.aliases.forEach(alias=>{ // check every alias that the command has
                    client.aliases.set(alias,commandName); // and log the alias, connected to the original command name
                });
            }
        }
    }
})();

client.login(configFile.token); // log in the bot

client.on('ready', () => { // when the bot is activated
    status(client); // sets the bot presence
});

client.on('message', msg =>{ // when someone sends a message
    if (msg.author.bot || msg.channel.type == "dm" || !msg.content.startsWith(configFile.prefix)){
        return; } // cancels all messages which came from DM's, from another bot, or don't start with prefix
    let args = msg.content.substring(msg.content.indexOf(configFile.prefix)+1).split(new RegExp(/\s+/)); // arguments after the command
    const commandName = args.shift().toLowerCase(); // the given command

    let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    if (command) {
        command.run(args,msg,client,Discord,configFile); // run the command with arguments, the message, the bot and the djs object
    } else { // if the command doesn't exist, the bot will say it
        const embed = new Discord.MessageEmbed()
                .setColor(configFile.color)
                .addField("Error",`This command doesn't exist. Use ${configFile.prefix}cmds to get all commands!`);
        msg.channel.send(embed);
    };
});