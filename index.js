const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberUpdate', function(oldMember, newMember) {
    if (newMember._roles.length > oldMember._roles.length) {
        let roleAssigned;

        newMember._roles.forEach(newRole => {
            if (!oldMember._roles.includes(newRole)) {
                roleAssigned = oldMember.guild.roles.cache.get(newRole).name;
            }
        });

        if (roleAssigned.toLowerCase().includes('patron')) {
            const publicChannel = oldMember.guild.channels.cache.find(ch => ch.name.includes('public-general-chat'));
            const patreonChannel = oldMember.guild.channels.cache.find(ch => ch.name.includes('patreon-welcome'))
            const emoji = newMember.guild.emojis.cache.find(emoji => emoji.name === "BalisongAdvanced");
            const message = new Discord.MessageEmbed()
                .setColor('#F57E20')
                .setDescription(`${emoji} ${newMember} just became a ${roleAssigned}!! Thank you!`)
                .setAuthor(`@${newMember.user.tag}`, newMember.user.avatarURL())
                .setThumbnail(newMember.user.avatarURL());

            publicChannel.send(message);
            patreonChannel.send(message);

            console.log(`Sent a message for user ${newMember.user.tag}`)
        }
    }
})

client.login(process.env.BOT_TOKEN);
