module.exports = {
  conf: {
    aliases: [],
    name: "allmute",
    help: "allmute",
    description: "Belirtilen kanalda tüm kullanıcılar susturulur",
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
    channel.members.filter((x) => !x.hasPermission("ADMINISTRATOR"))
      .forEach((x, index) => {
        client.wait(index * 1000);
        x.voice.setMute(true);
      });
    message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyeler susturuldu!`));
  },
};
