require('dotenv').config();
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
//get in the configuration for this bot
const config = require("./bot.config.js")
const helpfulScript = require("./helpful_script.js")

const sadWords = ["sad", "depressed", "unhappy", "angry", "red market"]

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

/*
if (sadWords.some(word => msg.content.includes(word))) {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(encouragement)
*/


//todo need to add welcome message to config
//get new incoming members at welcome channel and greet them
client.on('guildMemberAdd', member => {
    const welcomeMessage = "Welcome " + member.displayName + " to the **OnChainAsciiApes**.\nGood to have you! Assign your role at <#955137627831550002>"
    member.guild.channels.get('951840312752472144').send(welcomeMessage);
});

function botResponse(msg, allowedChannelConfig) {
    //is the bot allowed in her with this command
    let channelIdArray = allowedChannelConfig.map(a => a.channelId); //create array of channelIds from object array

    let indexOfAllowedElement = helpfulScript.isBotAllowedExtended(msg.channel.id, channelIdArray)
    if (indexOfAllowedElement != -1) {
        //bot is allowed in this channel
        //get channel, search if msg has allowedCommands in it, if allowed commands array is empty, search in all commands
        console.log("found data:", config.allowedChannels[indexOfAllowedElement])
        //now search what we should respond to
        let botCommands = "";
        console.log("length of found array", config.allowedChannels[indexOfAllowedElement].allowedCommands.length)
        if (config.allowedChannels[indexOfAllowedElement].allowedCommands.length === 0) {
            //all commands are allowed
            console.log("length==0")
            botCommands = config.botCommands.map(a => a.command);
        }
        else {
            botCommands = config.allowedChannels[indexOfAllowedElement].allowedCommands;
        }
        console.log("searching for these commands: ", botCommands)
        if (!reactOnCommand(msg, botCommands) && config.reactionSettings.reactOnUnknownCommands) {
            msg.channel.send(config.reactionSettings.reactMessage)
        }
    }
}


function logError(err, msg) {
    console.log(err)
    if (msg != null) {
        msg.channel.send(err)
    }
}

function reactOnCommand(msg, commands) {
    //check if commands is an array
    console.log("react on these commands", commands)
    //find where command is
    //you are allowed to search msg.content value in the available bot commands and react on them
    var wantedCommand = "";
    for (let i = 0; i < commands.length; i++) {
        if (helpfulScript.containsWord(msg.content, commands[i])) {
            //command found
            wantedCommand = commands[i];
            break;
        }
    }

    var indexOfCommand = config.botCommands.findIndex(a => a.command === wantedCommand);
    if (indexOfCommand != -1) {
        //available at config given commands
        if (config.botCommands[indexOfCommand].needsToBeExactCommand) {
            //console.log("searching for exact string")
            if (helpfulScript.hasExactString(msg.content, config.botCommands[indexOfCommand].command)) {
                console.log("exact string found")
                if (config.botCommands[indexOfCommand].definedFunction == undefined) {
                    logError("no function defined for this command", msg)
                    return
                }
                else {
                    config.botCommands[indexOfCommand].definedFunction(msg);
                    return (true)
                }
            }
        }
        else {
            config.botCommands[indexOfCommand].definedFunction(msg);
            return (true)
        }
    }
}


//react on messages
client.on("messageCreate", msg => {
    if (msg.author.bot) return //not replying to bot itself
    console.log("recieved message", msg.content)
    botResponse(msg, config.allowedChannels)
})

client.login(process.env.TOKEN)