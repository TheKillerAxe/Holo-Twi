require('dotenv').config();

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'magic',
        description: 'Replies with a familiar quote...'
    },
    {
        name: 'friends',
        description: 'Make a friend!',
        options: [
            {
                name: 'friend-name',
                description: 'Name of your new friend.',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'best-friends',
                description: 'Will you be best friends?',
                type: ApplicationCommandOptionType.Boolean
            }
        ]
    },
    {
        name: 'channel',
        description: "Axe's YouTube channel!"
    },
    {
        name: 'profile',
        description: "Axe's Destiny Profile"
    }
];

const rest = new REST({ version: 10 }).setToken(process.env.DC_TOKEN);

const registerCommands = async () => {
    try {
        console.log('Registering commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.DC_CLIENT_ID, process.env.DC_GUILD_ID),
            { body: commands }
        );

        console.log('Commands registered successfully!');
    } catch (err) { console.log(`>>> CAUGHT AN ERROR: ${err}`); }
}

module.exports = {
    registerCommands
}