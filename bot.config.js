const helpfulScript = require("./helpful_script.js")
const customFunctions = require("./custom_functions.js")
const botConfig = {

    botCommands: [
        {
            command: "!inspire",
            needsToBeExactCommand: true, //true=only will be executed if given command is identical string, false=will be fired, if the given command is found anywhere in string
            //true=match with delimiter(exact string), false=match with any string
            description: "throws an inspiring quote",
            definedFunction: function (msg) { customFunctions.inspiringQuote(msg) }
        },
        {
            command: "!love",
            needsToBeExactCommand: true,
            description: "instantly sends an love ape",
            definedFunction: function (msg) { customFunctions.sendLove(msg) }
        },
        {
            command: "!apes",
            needsToBeExactCommand: true,
            description: "assembles a bunch of the ape army",
            definedFunction: function (msg) { customFunctions.apeArmy(msg) }
        },
        {
            command: "!bot",
            needsToBeExactCommand: false, //if undefined it results in the same as false, so would be needed to give
            description: "gives you an yes/no/dont-know answer",
            definedFunction: function (msg) { customFunctions.askYesOrNo(msg) }
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
            definedFunction: function (msg) { customFunctions.questInformation(msg) }
        },
        {
            command: ["sad", "depressing", "unhappy", "angry", "red market"],
            needsToBeExactCommand: false, //true=only will be executed if given command is identical string, false=will be fired, if the given command is found anywhere in string
            //true=match with delimiter(exact string), false=match with any string
            description: "found this word sends a cheer up message",
            definedFunction: function (msg) { customFunctions.cheerUp(msg) }
        },

    ],
    //allowedCommands: //empty array=all botCommands are allowed in this channel, given array, searching for all which is given
    allowedChannels: [
        {
            channelName: "ask-the-bot",
            channelId: "977656438728048650",
            allowedCommands: ["!bot"]
        },
        {
            channelName: "bot-test",
            channelId: "971842106303856740",
            allowedCommands: []
        },
        {
            channelName: "general",
            channelId: "951778209005977603",
            allowedCommands: ["!help", "!inspire", "!love", "!apes", "!quest"]
        }

    ],
    welcomeUserSettings: {
        channelIdForReactMessage: "951840312752472144",
        welcomeMessage: function (member) { customFunctions.welcomeMessage(member) }
        // definedFunction: 
    },

    reactionSettings: {
        reactOnUnknownCommands: false,
        reactMessage: "command not found",
    }

}

module.exports = botConfig;