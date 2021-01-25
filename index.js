const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios')
const config = require("./config.json");

client.on('ready', () => {
  console.log(`------------------------\nSUCCESSFUL LAUNCH!\n------------------------`);
  /*
  	pingForPlayers()
	setInterval(pingForPlayers, Math.max(1, process.env.MC_PING_FREQUENCY || 1) * 60 * 1000)
  */
});
/*
function pingForPlayers() {

	// Ping API for server data.
	axios.get(`https://api.mcsrvstat.us/1/${process.env.MC_SERVER_IP}`).then(res => {
		// If we got a valid response
		if(res.data && res.data.players) {
			let playerCount = res.data.players.online || '0' // Default to zero
			client.channels.cache.find(channel => channel.id === '751436224144736368').setName(`Players: ${playerCount}`);
			console.log('Updated player count to', playerCount)
		}
		else
			console.log('Could not load player count data for', process.env.MC_SERVER)

	}).catch(err => console.log('Error pinging api.mcsrvstat.us for data:', err))
}
*/
client.on("message", function(message) {
  if (message.author.equals(client.user)) return;

  if (!message.content.startsWith(config.prefix)) {
    //
  } else {
    var args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
            case "suggestion":
      case "suggest":
        message.delete()
        if (args.length === 1) {
          message.channel.send(
            "**Wait, where is your suggestion? Try =suggest <suggestion>**"
          );
        } else {
          const sayMessage = args.join(" ");
          const Discords = require("discord.js");
          message.channel.send(
            "**Your suggestion is added to the <#786905301257289728> channel.**"
          );
          var suggestionChannel = client.channels.cache.find(channel => channel.id === '786905301257289728')
          const embed = new Discords.MessageEmbed()
            .setColor(0x27AE60)
            .setTitle("Suggestion by" + " " + message.author.username)
            .setDescription(
              `${sayMessage}`.replace("suggestion", "").replace("suggest", "")
            )
            .setTimestamp()
            .setFooter("Submitted on");
          suggestionChannel.send({ embed }).then(msg => {
            msg.react("🔺");
            msg.react("🔻");
          });
          console.log("\n\n>>>\n>>> Successfully submitted new suggestion by " + message.author.username + "\n>>>\n\n")
        }
        break;
      /*
      case "add":
        message.delete();
        function getRandomColor() {
          var letters = "0123456789ABCDEF";
          var color = "0x";
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        if (args.length === 1) {
          message.channel.send("Provide something to add!");
        } else {
          const sayMessage = args.join(" ");
          const Discords = require("discord.js");
          message.channel.send({
            embed: {
              color: Math.floor(Math.random() * 16777214) + 1,
              title: sayMessage.replace("add", "")
            }
          });
        }
        break;
        case "bonk":
        message.delete();
        message.channel.send("https://tenor.com/view/horny-jail-go-to-horny-jail-bonk-doge-cheems-gif-17582752")
        break;
        */
    }
  }
});
require("http").createServer((_, res) => res.end("Alive!")).listen(8080)
client.login(process.env.TOKEN);