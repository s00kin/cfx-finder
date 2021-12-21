const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, MessageAttachment  } = require('discord.js');
const bot = new Discord.Client()
const webshot = require("node-webshot")
const fetch = require("node-fetch")
const fs = require('fs')
const https = require("https")

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("!cfx code", { type: 'WATCHING'});
});

bot.login("token here")

bot.on('message', msg => {
    
    if(msg.content.startsWith("!cfx")){

        const args3 = msg.content.slice("!cfx".length).split(' ');

        var code = args3[1]
        var urlfivem = `https://servers-frontend.fivem.net/api/servers/single/${code}`
        https.get(urlfivem, function(res) {

            if(res.statusCode == 404){
                console.log('1')

                const mensaje = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription("Invalid CFX! Protected Server")
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    msg.channel.send(mensaje);

            }else{
                msg.reply("⚠️ Loading Please Wait 5sec (Trying to Get Parameters) ").then((message) => { setTimeout(() => { message.delete() }, 3000)})
                fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {

                    if(!out["Data"]["connectEndPoints"][0].startsWith("http")) {

                        setTimeout(() => {
                        var split = `${out["Data"]["connectEndPoints"][0]}`.split(":")
                        var urlip = "http://ip-api.com/json/"+ split[0] +"?fields=66846719"
                        fetch(urlip)
                            .then(res => res.json())
                            .then((out2) => {

                                if (out["icon"]) {
                                    var icon = out2["icon"]
                                    let file = new Buffer.from(icon, 'base64')
                                    const mensaje = new Discord.MessageEmbed()
                                        .setTitle('Server Info')
                                        .setColor("RANDOM")
                                        .addFields(
                                            { name: 'Server IP ', value: `${out["Data"]["connectEndPoints"][0]}` || 'Not found', inline: true }, 
                                            { name: 'CFX ', value: `[${out["EndPoint"]}](https://cfx.re/join/${out["EndPoint"]})` || 'Not found', inline: true },
                                            { name: 'ISP ', value: `${out2["isp"]}` || 'Not found', inline: true },
                                            { name: 'Pais ', value: `${out2["country"]}` || 'Not found', inline: true }, 
                                            { name: 'Proxy ', value: `${out2["proxy"]}` || 'Not found', inline: true }, 
                                            { name: 'Hosting ', value: `${out2["hosting"]}` || 'Not found', inline: true },
                                            { name: 'Mobile ', value: `${out2["mobile"]}` || 'Not found', inline: true },
                                            { name: 'Zip Code ', value: `${out2["zip"]}` || 'Not found', inline: true },
                                            { name: 'Timezone ', value: `${out2["timezone"]}` || 'Not found' , inline: true },
                                            { name: 'Org ', value: `${out2["org"]}` || 'Not found', inline: true },  
                                            { name: 'Connection ', value: `${out2["status"]}`|| 'Not found', inline: true },  
                                            { name: 'Players', value: `${out["Data"]["players"].length}/${out["Data"]["svMaxclients"]}` || 'Not found', inline: true },
                                            { name: 'Resources', value: `${out["Data"]["resources"].length}` || 'Not found', inline: true },
                                            { name: 'Server Name', value: `${out["Data"]["hostname"].substring(0, 390)}` || 'Not found', inline: true },
                                            { name: 'Project Name', value: `${out["Data"]["vars"]["sv_projectName"]}` || 'Not found', inline: true },
                                            { name: 'Project Desc', value: `${out["Data"]["vars"]["sv_projectDesc"]}` || 'Not found', inline: true },
                                            { name: 'Server Files', value: `${out["Data"]["server"]}` || 'Not found', inline: true },
                                            { name: 'Boost', value: `${out["Data"]["upvotePower"]}` || 'Not found', inline: true },
                                            { name: 'Onesync Enabled?', value: `${out["Data"]["vars"]["onesync_enabled"]}` || 'Not found', inline: true },
                                            { name: 'SV_LAN Enabled?', value: `${out["Data"]["vars"]["sv_lan"]}` || 'Not found', inline: true },
                                            { name: 'Gamebuild', value: `${out["Data"]["vars"]["sv_enforceGameBuild"]}` || 'Not found', inline: true },
                                            { name: 'Tags', value: `${out["Data"]["vars"]["tags"]}` || 'Not found', inline: true },
                                            { name: 'Owner Username', value: `${out['Data']['ownerName']}` || 'Not found', inline: true },
                                            { name: 'Owner Profile ->', value: `[${out['Data']['ownerName']}](${out['Data']['ownerProfile']})` || 'Not found', inline: false },
                                            { name: 'Info.Json ->', value: `[Info](http://${out["Data"]["connectEndPoints"][0]}/info.json)` || 'Not found', inline: false },
                                            { name: 'Dynamic.Json ->', value: `[Dynamic](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)` || 'Not found', inline: false },
                                            { name: 'Players.Json ->', value: `[Players](http://${out["Data"]["connectEndPoints"][0]}/players.json)` || 'Not found', inline: false },
                                                  )
                                        .setFooter(msg.author.tag, msg.author.avatarURL())
                                    setTimeout(() => { msg.reply(mensaje); }, 5000)
                                } else {
                                    console.log(`${out["Data"]["vars"]["banner_connecting"]}`)
                                    const mensaje = new Discord.MessageEmbed()
                                        .setTitle('Server Info')
                                        .setColor("RANDOM")
                                        .addFields(
                                            { name: 'Server IP ', value: `${out["Data"]["connectEndPoints"][0]}` || 'Not found', inline: true }, 
                                            { name: 'CFX ', value: `[${out["EndPoint"]}](https://cfx.re/join/${out["EndPoint"]})` || 'Not found', inline: true },
                                            { name: 'ISP ', value: `${out2["isp"]}` || 'Not found', inline: true },
                                            { name: 'Pais ', value: `${out2["country"]}` || 'Not found', inline: true }, 
                                            { name: 'Proxy ', value: `${out2["proxy"]}` || 'Not found', inline: true }, 
                                            { name: 'Hosting ', value: `${out2["hosting"]}` || 'Not found', inline: true }, 
                                            { name: 'Zip Code ', value: `${out2["zip"]}` || 'Not found', inline: true },
                                            { name: 'Timezone ', value: `${out2["timezone"]}` || 'Not found' , inline: true },
                                            { name: 'Org ', value: `${out2["org"]}` || 'Not found', inline: true },  
                                            { name: 'Connection ', value: `${out2["status"]}`|| 'Not found', inline: true },  
                                            { name: 'Players', value: `${out["Data"]["players"].length}/${out["Data"]["svMaxclients"]}` || 'Not found', inline: true },
                                            { name: 'Resources', value: `${out["Data"]["resources"].length}` || 'Not found', inline: true },
                                            { name: 'Server Name', value: `${out["Data"]["hostname"].substring(0, 390)}` || 'Not found', inline: true },
                                            { name: 'Project Name', value: `${out["Data"]["vars"]["sv_projectName"]}` || 'Not found', inline: true },
                                            { name: 'Project Desc', value: `${out["Data"]["vars"]["sv_projectDesc"]}` || 'Not found', inline: true },
                                            { name: 'Server Files', value: `${out["Data"]["server"]}` || 'Not found', inline: true },
                                            { name: 'Boost', value: `${out["Data"]["upvotePower"]}` || 'Not found', inline: true },
                                            { name: 'Onesync Enabled?', value: `${out["Data"]["vars"]["onesync_enabled"]}` || 'Not found', inline: true },
                                            { name: 'SV_LAN Enabled?', value: `${out["Data"]["vars"]["sv_lan"]}` || 'Not found', inline: true },
                                            { name: 'Gamebuild', value: `${out["Data"]["vars"]["sv_enforceGameBuild"]}` || 'Not found', inline: true },
                                            { name: 'Owner Username', value: `${out['Data']['ownerName']}` || 'Not found', inline: true },
                                            { name: 'Owner Profile ->', value: `[${out['Data']['ownerName']}](${out['Data']['ownerProfile']})` || 'Not found', inline: false },
                                            { name: 'Info.Json ->', value: `[Info](http://${out["Data"]["connectEndPoints"][0]}/info.json)` || 'Not found', inline: false },
                                            { name: 'Dynamic.Json ->', value: `[Dynamic](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)` || 'Not found', inline: false },
                                            { name: 'Players.Json ->', value: `[Players](http://${out["Data"]["connectEndPoints"][0]}/players.json)` || 'Not found', inline: false },
                                                  )
                                        .setFooter(msg.author.tag, msg.author.avatarURL())
                                        const tagsyetc = new Discord.MessageEmbed()
                                        .setColor("RANDOM")
                                        .addFields(
                                            { name: 'Tags', value: `${out["Data"]["vars"]["tags"]}` || 'Not found', inline: true },
                                            { name: 'Private Server', value: `${out["Data"]["private"]}` || 'Not found', inline: true },
                                            { name: 'Banner Connecting', value: `${out["Data"]["vars"]["banner_connecting"]}` || 'Not found', inline: true },
                                            { name: 'Banner Detail', value: `${out["Data"]["vars"]["banner_detail"]}` || 'Not found', inline: true },
                                            { name: 'Owner Avatar', value: `${out["Data"]["ownerAvatar"]}` || 'Not found', inline: true },
                                            )
                                        setTimeout(() => { msg.reply(mensaje); }, 5000)
                                        setTimeout(() => { msg.reply(tagsyetc); }, 5000)
                                }
                            })
                        }, 5000)

                    }else{
                        const mensaje = new Discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setDescription("```\n Cannot find server details...```")
                            .addField("Cfx Url", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addFields(  
                                            { name: 'Players', value: `${out["Data"]["players"].length}/${out["Data"]["svMaxclients"]}` || 'Not found', inline: true },
                                            { name: 'Resources', value: `${out["Data"]["resources"].length}` || 'Not found', inline: true },
                                            { name: 'Server Name', value: `${out["Data"]["hostname"].substring(0, 390)}` || 'Not found', inline: true },
                                            { name: 'Project Name', value: `${out["Data"]["sv_projectName"]}` || 'Not found', inline: true },
                                            { name: 'Project Desc', value: `${out["Data"]["sv_projectDesc"]}` || 'Not found', inline: true },
                                            { name: 'Server Files', value: `${out["Data"]["server"]}` || 'Not found', inline: true },
                                            { name: 'Boost', value: `${out["Data"]["upvotePower"]}` || 'Not found', inline: true },
                                            { name: 'Onesync Enabled?', value: `${out["Data"]["vars"]["onesync_enabled"]}` || 'Not found', inline: true },
                                            { name: 'SV_LAN Enabled?', value: `${out["Data"]["vars"]["sv_lan"]}` || 'Not found', inline: true },
                                            { name: 'Gamebuild', value: `${out["Data"]["vars"]["sv_enforceGameBuild"]}` || 'Not found', inline: true },
                                            { name: 'Tags', value: `${out["Data"]["vars"]["tags"]}` || 'Not found', inline: true },
                                            { name: 'Owner Username', value: `${out['Data']['ownerName']}`|| 'Not found', inline: true },
                                            { name: 'Owner Profile ->', value: `[${out['Data']['ownerName']}](${out['Data']['ownerProfile']})` || 'Not found', inline: false },
                                            { name: 'Info.Json ->', value: `[Info](http://${out["Data"]["connectEndPoints"][0]}/info.json)` || 'Not found', inline: false },
                                            { name: 'Dynamic.Json ->', value: `[Dynamic](http://${out["Data"]["connectEndPoints"][0]}/dynamic.json)` || 'Not found', inline: false },
                                            { name: 'Players.Json ->', value: `[Players](http://${out["Data"]["connectEndPoints"][0]}/players.json)` || 'Not found', inline: false },
                                      )
                            .setFooter(msg.author.tag, msg.author.avatarURL())
                        msg.channel.send(mensaje);
                    }
                }).catch((err) => {
                    console.log(err)
        })
    }
})                
}
})
