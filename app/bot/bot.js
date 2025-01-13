require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const botBehavior = () => {
    client.on('ready', (c) => {
        console.log(`${c.user.tag} is live!`);
    });

    // Messages
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) return;

        if (msg.content == 'Friendship') msg.reply('Is Magic!');
    });

    // Interactions
    client.on('interactionCreate', (inter) => {
        if (!inter.isChatInputCommand()) return;

        if (inter.commandName == 'magic') inter.reply('The Magic of Frienship!');

        if (inter.commandName == 'friends') {
            const userName = inter.user.globalName;
            const friendName = inter.options.get('friend-name').value;
            const bestFriend = inter.options.get('best-friends')?.value;

            inter.reply(`${userName} and ${friendName} are now ${bestFriend ? 'best friends!' : 'friends!'}`);
        }

        if (inter.commandName == 'channel') {
            const embed = new EmbedBuilder()
                .setTitle("Axe ^-^")
                .setDescription("This is Axe's YouTube channel!")
                .setThumbnail('https://yt3.googleusercontent.com/bHmVcHG-uk2Wk4OsxK1rfFek71E9l-eZDw8JRRw00lhLYBrHRVw7v-WefrMqWxD25OPKKWeEeHA=s160-c-k-c0x00ffffff-no-rj')
                .setURL('https://www.youtube.com/@TheKillerAxe')

            inter.reply({ embeds: [embed] });
        }
    });
}

const botLogIn = () => {
    botBehavior();
    client.login(process.env.DC_TOKEN);
}

module.exports = {
    botLogIn
};