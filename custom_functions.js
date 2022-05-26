
//used for inspiring quote
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));


exports.welcomeMessage = function (member) {
    const welcomeMessage = "Welcome " + member.displayName + " to the **OnChainAsciiApes**.\nGood to have you! Assign your role at <#955137627831550002>"
    member.guild.channels.get(config.welcomeUserSettings.channelIdForReactMessage).send(welcomeMessage);
}


exports.questInformation = function (msg) {
    msg.reply("Join the next quest, its live\nThe reward of this quest was 150$+ **Exciting**\njump to <#978240705816322098>")
}

exports.askYesOrNo = function (msg) {
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

exports.inspiringQuote = function (msg) {
    getInspiringQuote().then(quote => msg.channel.send(quote))
}

getInspiringQuote = function () {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + " -" + data[0]["a"]
        })
}

const encouragements = [
    "Cheer up!",
    "I believe in you!",
    "You can do all what you dreaming of!",
    "If you can´t do it who else could?",
    "It would be sad here without you!",
    "Stay strong friend!"
]
exports.cheerUp = function (msg) {
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
    msg.reply(encouragement)
}

//giv and img reactions
exports.apeArmy = function (msg) {
    msg.channel.send(
        {
            content: "Ape army assemble",
            files: ['./img/Apes.gif']
        });
}

exports.sendLove = function (msg) {
    msg.channel.send(
        {
            files: ['./img/LoveWasSentApe.png']
        });
}