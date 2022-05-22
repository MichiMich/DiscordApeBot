const Discord = require("discord.js")
//const fetch = require("node-fetch")
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
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

const helpText = 'available commands:\n' +
    '**ask the bot** - this could be pretty fun, go to <#977656438728048650> and fire some yes/no question with the command **!bot** in it, like: **hey !bot am I a free human?**\n' +
    '**!inspire** - get a inspiring quote\n' +
    '**!love** - send an love ape\n' +
    '**!apes** - assembles a bunch of the ape army\n' +
    '**!mint** - informations about mint\n' +
    '**!why** - points to information about that project' +
    '!roadmap - gives the current roadmap' +
    '!info - fires the mint, why and roadmap command\n'



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
    //add additional questions here, seperate them with some more command
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

//get new incoming members at welcome channel and greet them
client.on('guildMemberAdd', member => {
    const welcomeMessage = "Welcome " + member.displayName + " to the **OnChainAsciiApes**.\nGood to have you! Assign your role at <#955137627831550002>"
    member.guild.channels.get('951840312752472144').send(welcomeMessage);
});


//react on messages
client.on("messageCreate", msg => {
    if (msg.author.bot) return //not replying to bot itself

    if (msg.content === "$help" && (msg.channel.id === "974557216973672448" || msg.channel.id === "971842106303856740")) {
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
    botInformations(msg)


})




function botInformations(msg) {
    const roadmapAnswer = {
        content: "here is the current roadmap, more informations can be found at <#977276495649189888>",
        files: ['./OnChainAsciiApesRoadmap.png']
    }
    const mintAnswer = {
        content: "mint is terminated for **end of may 2022**\nI am a bot, I cant be excited, but I hope you are",
        files: ['./Apes.gif']
    }
    const whyAnswer = 'check why this project was created and whats it about at <#971419909735202828>'

    if (msg.content === "!mint") {
        msg.reply(mintAnswer)
    }
    /*todo: after mint
    else if(msg.content === "!floor") {}*/
    else if (msg.content === "!why") {
        msg.reply(whyAnswer)
    }
    else if (msg.content === "!roadmap") {
        msg.reply(roadmapAnswer)
    }
    else if (msg.content === "!info") {
        msg.send(whyAnswer)
        msg.send(roadmapAnswer)
        msg.send(mintAnswer)
    }
}


keepAlive()
client.login(process.env['TOKEN'])