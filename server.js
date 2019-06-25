
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://nainoboot.glitch.me/`);
}, 280000);

// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config')
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const daily = Math.floor(Math.random() * 350) + 10;
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');


client.on('ready', () => {
  client.user.setGame('Type 1help');
  console.log('---------------');
  console.log(' Bot Is Online')
  console.log('---------------')

});

 
 
client.on("message", message => {
    var prefix = "*";
 if (message.content === "1help") {
  const embed = new Discord.RichEmbed()  
      .setColor("#CCFFFF")
      .setDescription(`
**-=-=-=-=-=-=-=-=-=-=-=-=-=-=**
<:emoji_1:593185324251742244> **__1play__** **-** **__لتشغيل الاغنية برابط او بأسم للبحث__**
<:emoji_1:593185324251742244> **__1skip__** **-** **__لتجاوز الاغنية الحالية__**
<:emoji_1:593185324251742244> **__1vol [0-100]__** **-** **__لرفع الصوت__**
<:emoji_1:593185324251742244> **__1np__** **-** **__لمرفة الاغنيه المشغله__**
<:emoji_1:593185324251742244> **__1leave__** **-** **__لإطلاع البوت من السيرفر__**
<:emoji_1:593185324251742244> **__1queue__** **-** **__لمعرفة القائمة المشغله__**
<:emoji_1:593185324251742244> **__1stop__** **-** **__لتوقيف الاغنية__**
<:emoji_1:593185324251742244> **__1resume__** **-** **__لتكميل الاغنيه__**

**-=-=-=-=-=-=-=-=-=-=-=-=-=-=**
`)
   message.channel.sendEmbed(embed)
   
   }
   });


client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
   
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
   
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
 
    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length)
 
    if (command === `play`) {
        const voiceChannel = msg.member.voiceChannel;
       
        if (!voiceChannel) return msg.channel.send("I can't find you in any voice channel!");
       
        const permissions = voiceChannel.permissionsFor(msg.client.user);
       
        if (!permissions.has('CONNECT')) {
 
            return msg.channel.send("I don't have enough permissions to join your voice channel!");
        }
       
        if (!permissions.has('SPEAK')) {
 
            return msg.channel.send("I don't have enough permissions to speak in your voice channel!");
        }
 
        if (!permissions.has('EMBED_LINKS')) {
 
            return msg.channel.sendMessage("I don't have enough permissions to insert a URLs!")
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
 
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
           
 
            for (const video of Object.values(videos)) {
               
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
        } else {
 
            try {
 
                var video = await youtube.getVideo(url);
               
            } catch (error) {
                try {
 
                    var videos = await youtube.searchVideos(searchString, 5);
                    let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                   
                    .setColor("RANDOM")
                    msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
                   
/////////////////                  
                    try {
 
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 15000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('No one respone a number!!');
                    }
                   
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                   
                } catch (err) {
 
                    console.error(err);
                    return msg.channel.send("I didn't find any results!");
                }
            }
 
            return handleVideo(video, msg, voiceChannel);
           
        }
       
    } else if (command === `skip`) {
 
        if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
        if (!serverQueue) return msg.channel.send("There is no Queue to skip!!");
 
        serverQueue.connection.dispatcher.end('Ok, skipped!');
        return undefined;
       
    } else if (command === `leave`) {
 
        if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
        if (!serverQueue) return msg.channel.send("There is no Queue to stop!!");
       
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Ok, stopped & disconnected from your Voice channel');
        return undefined;
       
    } else if (command === `vol`) {
 
        if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
        if (!serverQueue) return msg.channel.send('You only can use this command while music is playing!');
        if (!args[1]) return msg.channel.send(`The bot volume is **${serverQueue.volume}**`);
       
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
       
        return msg.channel.send(`Volume Now is **${args[1]}**`);
 
    } else if (command === `np`) {
 
        if (!serverQueue) return msg.channel.send('There is no Queue!');
        const embedNP = new Discord.RichEmbed()
        .setDescription(`Now playing **${serverQueue.songs[0].title}**`)
        return msg.channel.sendEmbed(embedNP);
       
    } else if (command === `queue`) {
       
        if (!serverQueue) return msg.channel.send('There is no Queue!!');
        let index = 0;
//  //  //
        const embedqu = new Discord.RichEmbed()
        .setTitle("The Queue Songs :")
        .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#f7abab")
        return msg.channel.sendEmbed(embedqu);
    } else if (command === "stop") {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send('Ok, paused');
        }
        return msg.channel.send('There is no Queue to Pause!');
    } else if (command === "resume") {
 
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send('Ok, resumed!');
           
        }
        return msg.channel.send('Queue is empty!');
    }
 
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
   
 
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}!`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`Can't join this channel: ${error}!`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`**${song.title}**, just added to the queue! `);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
 
    serverQueue.textChannel.send(`**${song.title}**, is now playing!`);
}
 
 
client.on("message" , message=>{
if(message.content.startsWith("562772google")){
  let args = message.content.split(' ').slice(1).join(' ');
 
  const embed = new Discord.RichEmbed().setColor(0x00AE86);
 
  google(args, function (err, res){
    if (err) console.error(err);
 
    embed.setAuthor("Search for: " + args,
                    "https://images-ext-1.discordapp.net/external/UsMM0mPPHEKn6WMst8WWG9qMCX_A14JL6Izzr47ucOk/http/i.imgur.com/G46fm8J.png",
                    res.url);
   
   
    google.resultsPerPage = 5;
    for (var i = 0; i < 5; ++i) {
      var link = res.links[i];
     
     
      if (link === undefined || link.link === null || link.href === null) {
        continue;
      }
     
      if (link.description === "" || link.title === "")
        link.description = "None";
     
      embed.addField(link.title + "\n" + link.href,
                     link.description,
                     false);
    }
    message.channel.send({embed});
  });
}
})