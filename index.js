const Discord = require('discord.js');
var bot = new Discord.Client();
const YTDL = require("ytdl-core");
const prefix = "!";
const token = "Mjk2MDM0MDA5NTQ3Mjc2Mjg4.C7seVw.IBBTAAwtZPEWJGNASdPd4ksJFO0"

//funções
function play(connection, message){
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
	server.queue.shift();
	server.dispatcher.on("end",function(){
		if(server.queue[0]) play(connection, message);
		else connection.disconnect();
	});
}

//quarta parte

//primeira parte
bot.on('ready', () => {
  console.log('Bot is online!');
});

var servers = {};

//arrumar dps
/*
bot.on("guildMemberAdd", function(member){
	member.guild.channels.find("name", "tibão").sendMessage(member.toString() + "Logged in");

});
*/
bot.on('message', message => {
  if(message.content === '!daniel'){
      message.reply('Daniel safada');
  }
});

bot.on('message', message => {
  if(message.content === '!funk'){
      message.reply('Você quis dizer a musica dos deuses?');
			return
  }
});

bot.on('message', message => {
  if(message.content === '!Megumin'){
      message.reply('Melhor grill');
  }
});
//primeira parte

//segunda parte
bot.on('message', function(message){
	if(message.author.equals(bot.user)) return;

	if(!message.content.startsWith(prefix)) return;

	var args = message.content.substring(prefix.length).split(" ");

	switch(args[0].toLowerCase()){

		case "ping":
			message.channel.sendMessage("Pong!");
		break;

		case "notice"://terceira parte
			message.channel.sendMessage(message.author.toString() + "Bom dia sua safada")
		break;

		case "play":
			if(!args[1]){
				message.member.guild.roles.find("Insira um link");
				return;
			}

			if(!message.member.voiceChannel){
				message.channel.sendMessage("Precisa ta em um canal");
				return;
			}

			if(!servers[message.guild.id]) servers[message.guild.id] = {
				queue: []
			};

			var server = servers[message.guild.id];
			server.queue.push(args[1]);
			if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
					play(connection, message);
			});
		break;

		case "skip":
			var server = servers[message.guild.id];
			if(server.dispatcher) server.dispatcher.end();
		break;

		case "stop":
			message.channel.sendMessage(message.author.toString() + " Este comando ainda está com problemas.Use o skip até o final para parar a lista");
		//	var server = servers[message.guild.id];
		//if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
		break;


		default:
			message.channel.sendMessage("Comando Invalido");
	}
});
//segunda parte
//login do bot
bot.login(token);
//Purge ler dps
