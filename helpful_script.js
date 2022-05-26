exports.isBotAllowed = function (msg) {
    for (var i = 0; i < channelIdsForBot.length; i++) {
        if (msg.channel.id === channelIdsForBot[i]) {
            return (true);
        }
    }
}

exports.containsWord = function (data, wantedWord) {
    if (data.toLowerCase().match(wantedWord)) {
        return (true)
    }
}

exports.hasExactString = function (data, wantedWord) {
    if (data.toLowerCase().search("^" + wantedWord + "$") >= 0) {
        return (true)
    }
}

exports.isBotAllowed = function (channelId, allowedChannels) {
    if (typeof allowedChannels != typeof []) {
        console.log("allowedChannels type invalid, array expected");
        return;
    }
    for (var i = 0; i < allowedChannels.length; i++) {
        if (channelId === allowedChannels[i]) {
            return (true);
        }
    }
}

//returns the value of the found index, -1=not found
exports.isBotAllowedExtended = function (channelId, allowedChannels) {
    if (typeof allowedChannels != typeof []) {
        console.log("allowedChannels type invalid, array expected");
        return;
    }
    for (var i = 0; i < allowedChannels.length; i++) {
        if (channelId === allowedChannels[i]) {
            return (i);
        }
    }
    return (-1);
}

exports.get


exports.createHelpCommand = function (botCommands) {
    if (typeof botCommands != typeof []) {
        console.log("botCommands type invalid, array expected");
        return;
    }
    var helpText = "";
    for (var i = 0; i < botCommands.length; i++) {
        helpText += "**" + botCommands[i].command + "**" + " - " + botCommands[i].description + "\n";
    }
    return helpText;
}

