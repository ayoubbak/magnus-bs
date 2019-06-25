const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "%";







client.on("message", message => {

            if (message.content.startsWith(prefix + "bc")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' '); 
  message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
 m.send(`${argresult}\n ${m}`);
})
 message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'all').size}\` : عدد الاعضاء المستلمين`); 
 message.delete(); 
};     
});

client.on('message' , message => {
      if(message.author.bot) return;
     
      if(message.content.startsWith("*rbc")) {
        if (!message.member.hasPermission("ADMINISTRATOR"))  return;
        let args = message.content.split(" ").slice(2);
     var codes = args.join(' ')
       
        if(!codes) {
          message.channel.send("Try -help")
            return;
        }
     
     
              var role = message.mentions.roles.first();
                if(!role) {
                  message.reply("I CAnot Find TheRole")
                    return;
                }
            message.guild.members.filter(m => m.roles.get(role.id)).forEach(n => {
              n.send(
              "**" + "السيرفر :" + "\n" +
              `${message.guild.name}` + "\n" +
              "المرسل :" + "\n" +
              `${message.author.tag}` + "\n" +
              "الرسالة :" + "\n" +
              `${codes}` + "**"
              )
            })
            message.channel.send(`لقد تم ارسال هذه الرسالة الى ${message.guild.members.filter(m => m.roles.get(role.id)).size} عضو`)
        }
    });







client.on("message", async message => {
    if(message.content.startsWith("%vip-help")) {
        let help = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setDescription(`**__برودكاست بوت | Version 1.1__ 

💠%bc :برودكاست عادي
💠%bco:برودكاست للاونلاين فقط
💠%rbc:برودكاست لرتبه معينه

            
**`);
            message.channel.sendEmbed(help); // رابط السيرفر يعود الى سيرفر CODES .
    }
});
       
        











client.login(process.env.BOT_TOKEN);
