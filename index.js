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


//todo need to add welcome message to config
//get new incoming members at welcome channel and greet them
client.on('guildMemberAdd', member => {
    const welcomeMessage = "Welcome " + member.displayName + " to the **OnChainAsciiApes**.\nGood to have you! Assign your role at <#955137627831550002>"
    member.guild.channels.get('951840312752472144').send(welcomeMessage);
});

function botResponse(msg, allowedChannelConfig) {
    //is the bot allowed in her with this command
    let channelIdArray = allowedChannelConfig.map(a => a.channelId);

    let indexOfAllowedElement = helpfulScript.isBotAllowedExtended(msg.channel.id, channelIdArray)
    if (indexOfAllowedElement != -1) {
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
    //search in array if content is found and react
    for (i = 0; i < commands.length; i++) {
        needsToBeExactCommand = config.botCommands[i].needsToBeExactCommand;
        console.log("needs to be exact command: ", needsToBeExactCommand)
        console.log("search for exact command:", commands[i])
        if (helpfulScript.hasExactString(msg.content, commands[i]) && needsToBeExactCommand ||
            !needsToBeExactCommand && helpfulScript.containsWord(msg.content, commands[i])) {
            //ok, we found the command, and we now where the i is in the config, but now I want to call a function
            if (config.botCommands[i].definedFunction == undefined) {
                logError("no function defined for this command", msg)
                return
            }
            config.botCommands[i].definedFunction(msg)
            return true
        }
    }
}


//react on messages
client.on("messageCreate", msg => {
    if (msg.author.bot) return //not replying to bot itself
    console.log("recieved message", msg.content)
    botResponse(msg, config.allowedChannels)
})

//keepAlive()
client.login(process.env.TOKEN)