// XP System By ShiNxz#0001
// - Setup -
const Discord = require('discord.js');
const config = require("./config.json");
const { Client } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'REACTION'] });
const mysql = require("mysql");
const canvacord = require("canvacord");

// - Embed Footer Settings -
let footerText = config.footerText;
let footerIcon = config.footerIcon;

// - Login -
const PREFIX = config.PREFIX;
client.login(config.token);


client.on('ready', () =>{
        console.log('============================================');    							// START CONSOLE.LOG
		console.log('$ XP System is online.');														// START CONSOLE.LOG
		console.log('$ Made by ShiNxz#0001 | https://github.com/ShiNxz');							// START CONSOLE.LOG
		console.log('============================================');								// START CONSOLE.LOG
		
		client.user.setActivity(`XP System by ShiNxz#0001 | !xp`, {type: "WATCHING"}).catch(console.error);	// STATUS
})
var con = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
con.connect(err => {
	if(err) throw err;
	console.log("Database Connected.");
	console.log("Checking if XP Table exist...");
	con.query(`SHOW TABLES LIKE 'xp'`, (err, rows) => {
		if(err) throw err;
		if(rows.length < 1) {
			console.log('============================================');
			console.log('XP Table isnt exist, creating the XP table...');
			con.query(`CREATE TABLE xp ( id VARCHAR(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL , xp INT(11) NOT NULL , UNIQUE (id)) ENGINE = InnoDB;`);
			console.log('XP Table installed.');
			console.log('============================================');
		} else {
			console.log('============================================');
			console.log('XP Table exist... printing the current XP table:');
			con.query(`SELECT * FROM xp`, (err, rows) => {
				if(err) throw err;
			console.log(rows);
			});
			console.log('============================================');
		}
	});
});

client.on('guildMemberAdd', member => {	// NEW MEMBER
	// Optional, comment if you dont want the bot to create an xp table for each member who enters the server.
	if(member.user.bot) return;
	con.query(`SELECT * FROM xp WHERE id = '${member.user.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			sql = `INSERT INTO xp (id, xp) VALUES ('${member.user.id}', '0')`;
			con.query(sql);
		} else {
			return
		}
	});

});

client.on('guildMemberRemove', member => {	// MEMBER LEAVE
		// Optional, omment if you dont want the bot to remove the xp table for each member who leave the server.
		if(member.user.bot) return;
		con.query(`SELECT * FROM xp WHERE id = '${member.user.id}'`, (err, rows) => {
			if(err) throw err;
			let sql;
			if(rows.length < 1) {
				return
			} else {
				sql = `DELETE FROM xp WHERE id = '${member.user.id}'`;
				con.query(sql);	
				console.log('member removed.');
			}
		});
});

function generateXp() {
	let min = config.minXP;
	let max = config.maxXP;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on('message', async message=>{
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`;
		} else {
			let xp = rows[0].xp;
			sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
		}
		con.query(sql);
});
	con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		if(rows.length < 1) return

		let newXP = rows[0].xp;

		if(newXP < config.level1) { return }
		// LEVEL 1
		else if(newXP >= config.level1 && newXP < config.level2){
			if(message.member.roles.cache.find(role => role.id === config.level1RoleID)) return
			message.member.roles.add(config.level1RoleID) ;
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 1!`)
			.setDescription(`User ${message.author} raised to level 1 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 2
		else if(newXP >= config.level2 && newXP < config.level3){
			if(message.member.roles.cache.find(role => role.id === config.level2RoleID)) return
			message.member.roles.add(config.level2RoleID);
			message.member.roles.remove(config.level1RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 2!`)
			.setDescription(`User ${message.author} raised to level 2 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 3
		else if(newXP >= config.level3 && newXP < config.level4){
			if(message.member.roles.cache.find(role => role.id === config.level3RoleID)) return
			message.member.roles.add(config.level3RoleID);
			message.member.roles.remove(config.level2RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 3!`)
			.setDescription(`User ${message.author} raised to level 3 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 4
		else if(newXP >= config.level4 && newXP < config.level5){
			if(message.member.roles.cache.find(role => role.id === config.level4RoleID)) return
			message.member.roles.add(config.level4RoleID);
			message.member.roles.remove(config.level3RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 4!`)
			.setDescription(`User ${message.author} raised to level 4 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 5
		else if(newXP >= config.level5 && newXP < config.level6){
			if(message.member.roles.cache.find(role => role.id === config.level5RoleID)) return
			message.member.roles.add(config.level5RoleID);
			message.member.roles.remove(config.level4RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 5!`)
			.setDescription(`User ${message.author} raised to level 5 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 6
		else if(newXP >= config.level6 && newXP < config.level7){
			if(message.member.roles.cache.find(role => role.id === config.level6RoleID)) return
			message.member.roles.add(config.level6RoleID);
			message.member.roles.remove(config.level5RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 6!`)
			.setDescription(`User ${message.author} raised to level 6 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 7
		else if(newXP >= config.level7 && newXP < config.level8){
			if(message.member.roles.cache.find(role => role.id === config.level7RoleID)) return
			message.member.roles.add(config.level7RoleID);
			message.member.roles.remove(config.level6RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 7!`)
			.setDescription(`User ${message.author} raised to level 7 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 8
		else if(newXP >= config.level8 && newXP < config.level9){
			if(message.member.roles.cache.find(role => role.id === config.level8RoleID)) return
			message.member.roles.add(config.level8RoleID);
			message.member.roles.remove(config.level7RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 8!`)
			.setDescription(`User ${message.author} raised to level 8 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})

		}
		// LEVEL 9
		else if(newXP >= config.level9 && newXP < config.level10){
			if(message.member.roles.cache.find(role => role.id === config.level9RoleID)) return
			message.member.roles.add(config.level9RoleID);
			message.member.roles.remove(config.level8RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 9!`)
			.setDescription(`User ${message.author} raised to level 9 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
		// LEVEL 10
		else if(newXP >= config.level10){
			if(message.member.roles.cache.find(role => role.id === config.level10RoleID)) return
			message.member.roles.add(config.level10RoleID);
			message.member.roles.remove(config.level9RoleID);
			const newLevel = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Raised to level 10!`)
			.setDescription(`User ${message.author} raised to level 10 with ${newXP} XP!`)
			.setColor(config.primaryColor)
			.setTimestamp()
			.setThumbnail(message.member.user.displayAvatarURL())
			.setFooter(footerText, footerIcon);
			message.channel.send(newLevel).then(sentMessage => {
				sentMessage.react(config.closeReactionID);})
		}
	});



	if(!message.content.startsWith(PREFIX) || message.author.bot) return;
	let args = message.content.substring(PREFIX.length).split(" ");
		switch(args[0]){
			case 'xp':
				case 'level':
					case 'XP':
			let target = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;

			con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
				if(err) throw err;

				const notFound = new Discord.MessageEmbed()
				.setTitle("Error!")
				.setDescription(`User ${target} not found in the db.`)
				.setColor("#000")
				.setTimestamp()
				.setFooter(footerText, footerIcon);

				if(!rows[0]) return message.channel.send(notFound)

				let xp = rows[0].xp;

				if(xp < config.level1) { 
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 0 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(0)
					.setRank(0,0,false)
					.setRequiredXP(config.level1)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 1
				else if(xp >= config.level1 && xp < config.level2) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 1 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(1)
					.setRank(0,0,false)
					.setRequiredXP(config.level2)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 2
				else if(xp >= config.level2 && xp < config.level3) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 2 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(2)
					.setRank(0,0,false)
					.setRequiredXP(config.level3)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 3
				else if(xp >= config.level3 && xp < config.level4) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 3 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(3)
					.setRank(0,0,false)
					.setRequiredXP(config.level4)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 4
				else if(xp >= config.level4 && xp < config.level5) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 4 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(4)
					.setRank(0,0,false)
					.setRequiredXP(config.level5)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 5
				else if(xp >= config.level5 && xp < config.level6) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 5 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(5)
					.setRank(0,0,false)
					.setRequiredXP(config.level6)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 6
				else if(xp >= config.level6 && xp < config.level7) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 6 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(6)
					.setRank(0,0,false)
					.setRequiredXP(config.level7)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 7
				else if(xp >= config.level7 && xp < config.level8) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 7 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(7)
					.setRank(0,0,false)
					.setRequiredXP(config.level8)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 8
				else if(xp >= config.level8 && xp < config.level9) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 8 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(8)
					.setRank(0,0,false)
					.setRequiredXP(config.level9)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 9
				else if(xp >= config.level9 && xp < config.level10) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 9 | **XP:** ${xp}\nNeed more ${config.level1-xp} XP to raise to level 1`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(9)
					.setRank(0,0,false)
					.setRequiredXP(config.level10)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
				// LEVEL 10
				else if(xp >= config.level10) {
					const xpS = new Discord.MessageEmbed()
					.setTitle(`${target.tag} Level`)
					.setDescription(`**Level:** 10 | **XP:** ${xp}`)
					.setColor(config.primaryColor)
					.setThumbnail(target.displayAvatarURL())
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					message.channel.send(xpS);

					const rank = new canvacord.Rank()
					.setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png'}))
					.setCurrentXP(xp)
					.setLevel(10)
					.setRank(0,0,false)
					.setRequiredXP(config.level10)
					.setStatus(target.presence.status)
					.setProgressBar('#FF8000', "COLOR")
					.setUsername(target.username)
					.setDiscriminator(target.discriminator)
					rank.build()
					.then(data => {
						const attatchment = new Discord.MessageAttachment(data, 'rank.png')
						message.channel.send(attatchment);
					})
				}
			});

			break;

			// EXP Reset Command
			case 'reset':
				if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You dont have access to this command.')
				let resetTarget = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
				if(!resetTarget) return message.channel.send("[USE] !reset [@user]")
				con.query(`SELECT * FROM xp WHERE id = '${resetTarget.id}'`, (err, rows) => {
					if(err) throw err;
	
					const notFound = new Discord.MessageEmbed()
					.setTitle("Error!")
					.setDescription(`User ${resetTarget} not found in the xp db.`)
					.setColor("#000")
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					if(!rows[0]) return message.channel.send(notFound);
				con.query(`UPDATE xp SET xp = 0 WHERE id = '${resetTarget.id}'`);
				const member = message.guild.member(resetTarget);
				member.roles.remove(config.level1RoleID);
				member.roles.remove(config.level2RoleID);
				member.roles.remove(config.level3RoleID);
				member.roles.remove(config.level4RoleID);
				member.roles.remove(config.level5RoleID);
				member.roles.remove(config.level6RoleID);
				member.roles.remove(config.level7RoleID);
				member.roles.remove(config.level8RoleID);
				member.roles.remove(config.level9RoleID);
				member.roles.remove(config.level10RoleID);
				message.channel.send("User level reset successfully");
				})
				break;

			case 'setxp':
				String.prototype.isNumber = function() {
					return /^\d+$/.test(this);
				};
				if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You dont have access to this command.')
				let settarget = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
				if(!settarget) return message.channel.send("[USE] !reset [@user] [XP]")
				con.query(`SELECT * FROM xp WHERE id = '${settarget.id}'`, (err, rows) => {
					if(err) throw err;
	
					const notFound = new Discord.MessageEmbed()
					.setTitle("Error!")
					.setDescription(`User ${resetTarget} not found in the xp db.`)
					.setColor("#000")
					.setTimestamp()
					.setFooter(footerText, footerIcon);
					if(!rows[0]) return message.channel.send(notFound);

				if(!args[2]) return message.channel.send('You didnt specify an XP amount\n[USE]``!setxp [@user] [exp]``');
				if(!args[2].isNumber()) return message.channel.send('Please specify a correct XP amount.');

				con.query(`UPDATE xp SET xp = ${args[2]} WHERE id = '${settarget.id}'`);
				const member = message.guild.member(settarget);
				member.roles.remove(config.level1RoleID);
				member.roles.remove(config.level2RoleID);
				member.roles.remove(config.level3RoleID);
				member.roles.remove(config.level4RoleID);
				member.roles.remove(config.level5RoleID);
				member.roles.remove(config.level6RoleID);
				member.roles.remove(config.level7RoleID);
				member.roles.remove(config.level8RoleID);
				member.roles.remove(config.level9RoleID);
				member.roles.remove(config.level10RoleID);

				if(args[2] < config.level1 ) {
				} else if(args[2] >= config.level1 && args[2] < config.level2) {
					member.roles.add(config.level1RoleID); // LEVEL 1
				}
				else if(args[2] >= config.level2 && args[2] < config.level3) {
					member.roles.add(config.level2RoleID); // LEVEL 2
				}
				else if(args[2] >= config.level3 && args[2] < config.level4) {
					member.roles.add(config.level3RoleID); // LEVEL 3
				}
				else if(args[2] >= config.level4 && args[2] < config.level5) {
					member.roles.add(config.level4RoleID); // LEVEL 4
				}
				else if(args[2] >= config.level5 && args[2] < config.level6) {
					member.roles.add(config.level5RoleID); // LEVEL 5
				}
				else if(args[2] >= config.level6 && args[2] < config.level7) {
					member.roles.add(config.level6RoleID); // LEVEL 6
				}
				else if(args[2] >= config.level7 && args[2] < config.level8) {
					member.roles.add(config.level7RoleID); // LEVEL 7
				}
				else if(args[2] >= config.level8 && args[2] < config.level9) {
					member.roles.add(config.level8RoleID); // LEVEL 8
				}
				else if(args[2] >= config.level9 && args[2] < config.level10) {
					member.roles.add(config.level9RoleID); // LEVEL 9
				}
				else if(args[2] >= config.level10) {
					member.roles.add(config.level10RoleID); // LEVEL 10
				}
				else {
					console.log('Error.');
				}

				message.channel.send(`User ${settarget.tag} XP successfully changed to - ${args[2]}`);
				})

			break;

			case 'leaderboard':
				case 'top':
					con.query(
						'SELECT * FROM xp ORDER BY xp DESC LIMIT 10;', (err, rows) => {
							if(err) throw err;
							if(rows.length < 1) return
							let userNames = '';
							let xp = '';
							const embed = new Discord.MessageEmbed()
							.setTitle('Leaderboard:')
							.setColor('#FF8000')
							.setFooter(footerText, footerIcon)
							.setTimestamp();

						for (i = 0; i < rows.length; i++) {
							const data = rows[i];
							userNames += `\`${i + 1}\` <@${data.id}>\n`;
							xp += `\`${data.xp}\`\n`;
						  }

						  embed.addFields({ name: 'ID / Name', value: userNames, inline: true },
						  { name: 'XP', value: xp, inline: true });

						  return message.channel.send({ embed });
						});
			break;
}});


client.on( 'messageReactionAdd' , async (reaction, user) => {
    if(user.bot) return; 														// Check if user isnt bot
    if (reaction.partial) {														// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	if(reaction.emoji.id === config.closeReactionID) {
		let embeds = reaction.message.embeds;
		if(embeds[0].footer === footerText, footerIcon) {
		try {
			reaction.message.delete();
		} catch(err) {
			console.log(err);
		}
	}}
		
});