const configFile = require("../config.json"); // config file

module.exports = client => {
    console.log(client.user.username+" is online!")
    const statuses = { // all the statuses
        0: {
            type: "WATCHING",
            name: `👨‍💻over ${client.guilds.cache.size} servers!`
        },
        1: {
            type: "PLAYING",
            name: `🛠️Use ${configFile.prefix}help!`
        },
    }

    setInterval(()=>{
        let oldStatus; // previous status
        let statusIndex = Math.floor(Math.random() * Object.keys(statuses).length); // choose a random status to get from the statuses
        while (oldStatus == statusIndex){ // runs while the new status is equal to the previous
            statusIndex = Math.floor(Math.random() * Object.keys(statuses).length)} // try to assign a different value to the new status

        client.user.setPresence({status:"online",activity:{name:statuses[statusIndex].name,type:statuses[statusIndex].type}}) // changes the status
        oldStatus = statusIndex; // log the previous status
    }, 10000); // wait 10 seconds (i think) and restarts
};