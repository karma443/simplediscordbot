const { inspect } = require('util');

module.exports.run = async (args,msg,client,Discord,configFile) => {
    if (msg.author.id !== configFile.ownerId) return msg.channel.send("not allowed");
    try {
       let evaled = await eval(args.join(" "));
       msg.channel.send(inspect(evaled));
    } catch(error) {
        console.error(error);
        msg.reply('There was an error during evaluation.');
    }
}
module.exports.config = {
    name: "eval",
    aliases: ["exec","run"],
    help: {info:"Gets a user's avatar and returns ready to download.",cmd_info:"<users/roles>"}
}