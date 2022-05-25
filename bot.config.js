const discordFunctions = require("./discord_functions.js")
const helpfulScript = require("./helpful_script.js")

const botConfig = {

    botCommands: [
        {
            command: "!inspire",
            needsToBeExactCommand: true, //true=only will be executed if given command is identical string, false=will be fired, if the given command is found anywhere in string
            //true=match with delimiter(exact string), false=match with any string
            description: "throws an inspiring quote",
            definedFunction: function (msg) { helpfulScript.getInspiringQuote().then(quote => msg.channel.send(quote)) }
        },
        {
            command: "!love",
            needsToBeExactCommand: true,
            description: "instantly sends an love ape",
            definedFunction: function (msg) {
                msg.channel.send(
                    {
                        files: ['./img/LoveWasSentApe.png']
                    });
            }
        },
        {
            command: "!apes",
            needsToBeExactCommand: true,
            description: "assembles a bunch of the ape army",
            definedFunction: function (msg) {
                msg.channel.send(
                    {
                        content: "Ape army assemble",
                        files: ['./img/Apes.gif']
                    });
            }
        }, {
            command: "!bot",
            needsToBeExactCommand: false, //if undefined it results in the same as false, so would be needed to give
            description: "gives you an yes/no/dont-know answer",
            definedFunction: function askYesOrNo(msg) {
                //some wants to get an answer
                const value = Math.random()
                if (value < 0.33) {
                    msg.reply("yes")
                }
                else if (value < 0.66) {
                    msg.reply("no")
                }
                else {
                    msg.reply("I can´t answer this")
                }
            }
        },
        {
            command: "!help",
            needsToBeExactCommand: true,
            description: "shows all available commands",
            definedFunction: function (msg) { msg.channel.send(helpfulScript.createHelpCommand(botConfig.botCommands)) }
        },
        {
            command: "!quest",
            needsToBeExactCommand: true,
            description: "shows the current quest informations",
            definedFunction: function (msg) { msg.reply("Join the next quest, its live\nThe reward of this quest was be 150$+ **Exciting**\njump to <#978240705816322098>") }
        }

    ],
    allowedChannels: [
        {
            channelName: "ask-the-bot",
            channelId: "977656438728048650",
            allowedCommands: ["!bot"]
        },
        {
            channelName: "bot-test",
            channelId: "971842106303856740",
            allowedCommands: [] //empty array=all botCommands are allowed in this channel
        }
    ],
    reactionSettings: {
        reactOnUnknownCommands: false,
        reactMessage: "command not found",
    }

}

module.exports = botConfig;