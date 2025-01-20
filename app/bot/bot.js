require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, AttachmentBuilder } = require('discord.js');

const commands = require('./register-commands');
const apiConfig = require('../bungie-api/api-config');
const apiRequests = require('../bungie-api/api-requests');

const users = [];

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

        try {
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

            if (inter.commandName == 'bng-login') {
                if (inter.options.get('link')) {
                    const authLink = apiConfig.authLink();
                    inter.reply('Use this link to authorize the use of this app on your Bungie account: ' + authLink);
                    return;
                }

                const code = inter.options.get('code')?.value;

                if (code) {
                    const dc_name = inter.user.username;
                    const userInfo = apiConfig.APIConfig(code);

                    const user = {
                        dc_name,
                        ...userInfo
                    };

                    users.push(user);
                    console.log(users);
                }
                else { inter.reply('Please choose an option! Remember, link first, then code.') }
            }

            if (inter.commandName == 'trinity-kills') {
                const user = users.find((u) => u.dc_name == inter.user.username);

                if (!user) {
                    inter.reply(`You're not logged into your Bungie account. Please use /bng-login to log in.`);
                    return;
                }

                const { memberhip_type, memberhip_id, access_token } = user;
                const tracker = apiRequests.getTGhoulKills(memberhip_type, memberhip_id, access_token);

                inter.reply('Your total amount of Trinity Ghoul kills: ' + tracker);
            }
        } catch (error) {
            inter.reply('Oops, something went wrong! Working the magic, please be patient :)');
            console.log(error);
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