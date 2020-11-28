const Discord = require("discord.js");

module.exports.createEmbed = (options) => {
    const newEmbed = new Discord.MessageEmbed()
        .setTitle(options.title || "Embed Title")
        .setColor(options.color || "#7289da")
        .setDescription(options.description || "");
    for (const field of options.fields || []) {
        newEmbed.addField(field.name,field.value,field.isInline)};
    return newEmbed;
}