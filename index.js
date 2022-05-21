const Discord = require("discord.js")
//const fetch = require("node-fetch")
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const keepAlive = require("./server")
const sadWords = ["sad", "depressed", "unhappy", "angry", "red market"]
const channelIdForAskTheBot = ["977656438728048650", "971842106303856740"] //add wanted ids here where bot can be asked with !bot command
const encouragements = [
    "Cheer up!",
    "I believe in you!",
    "You can do all what you dreaming of!",
    "If you can´t do it who else could?",
    "It would be sad here without you!",
    "Stay strong friend!"
]

const helpText = 'available commands:\n**!inspire** - get a inspiring quote\n**!love** - send an love ape\n**!apes** - assembles a bunch of the ape army\n anymessage including **!bot** which should be a yes or now question will result in a random yes or no \nexample: hey !bot am I a free human?'


function getQuote() {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

function botQuestionInChannelAllowed(msg) {
    for (var i = 0; i < channelIdForAskTheBot.length; i++) {
        if (msg.channel.id === channelIdForAskTheBot[i]) {
            return (true);
        }
    }
}

function askTheBot(msg) {
    askYesOrNo(msg)
}

function askYesOrNo(msg) {
    //some wants to get an answer
    const value = Math.random()
    if (value < 0.3) {
        msg.reply("yes")
    }
    else if (value < 0.6) {
        msg.reply("no")
    }
    else {
        msg.reply("I can´t answer this")
    }
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

//react on messages
client.on("messageCreate", msg => {
    if (msg.author.bot) return //not replying to bot itself

    if (msg.content === "$help") {
        msg.channel.send(helpText)
    }
    else if (msg.content === "!inspire" || msg.content === "! inspire") {
        getQuote().then(quote => msg.channel.send(quote))
    }
    else if (msg.content === "!love" || msg.content === "! love") {
        msg.channel.send(
            { /*content: "Love was send",*/
                files: ['./LoveWasSentApe.png']
            });
    }
    else if (msg.content === "!apes" || msg.content === "! apes") {
        msg.channel.send(
            {
                content: "Ape army assemble",
                files: ['./Apes.gif']
            });
    }
    else if (msg.content.search("!bot") >= 0 && botQuestionInChannelAllowed(msg)) {
        askTheBot(msg);
    }
    else if (sadWords.some(word => msg.content.includes(word))) {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(encouragement)
    }

})

keepAlive()
client.login(process.env['TOKEN'])