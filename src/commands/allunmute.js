module.exports = {
  conf: {
    aliases: [],
    name: "allunmute",
    help: "allunmute",
    description: "Belirtilen kanalda tüm kullanıcıların susturulması açılır",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission("MOVE_MEMBERS")) return;
    const channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
    if (!channel) return message.channel.send(embed.setDescription("Bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!"));
    channel.members.forEach((x, index) => {
      client.wait(index * 1000);
      x.voice.setMute(false);
    });
    message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyelerin susturulması kaldırıldı!`));
  },
};
