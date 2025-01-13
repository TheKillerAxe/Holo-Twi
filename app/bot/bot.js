require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const commands = require('./register-commands');
commands.registerCommands();

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
            const file = new AttachmentBuilder('assets/img/axe-channel-pfp.jpg');
            const embed = new EmbedBuilder()
                .setTitle("Axe ^-^")
                .setDescription("This is Axe's YouTube channel!")
                .setThumbnail('attachment://axe-channel-pfp.jpg')
                .setURL('https://www.youtube.com/@TheKillerAxe')

            inter.reply({ embeds: [embed], files: [file] });
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