// -----------
// -- INDEX --
// -----------
const {Client} = require('discord.js');
const {config} = require('dotenv');
const client = new Client({disableEveryone: true});

config({
    path: __dirname + "/.env"
})

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

// ------------
// -- EVENTS --
// ------------
//upon ready
client.on('ready', () => {
    console.log("Uma delicia");
    client.user.setPresence({
        status: "online",
        game : { 
            name:"Buy Skyrim", 
            type:"PLAYING"
        }
    })
})

//upon msg
client.on('message', async message => {
    //prefix to cmd
    const prefix='!';

    //stop if not server, bot (to prevent looping), and anything that doesn't start with our cmd prefix
    if(message.author.bot || !message.guild || !message.content.startsWith(prefix)
    || message.channel.name != "bot-commands")
    {
        //console.log("Shit!");
        return;
    }

    //member sometimes returns false
    if(!message.member) message.member = await message.guild.fetchMember(message);

    commandProcess(message, prefix.length);
})

// ---------------
// -- FUNCTIONS --
// ---------------

//commands processing:
function commandProcess(message, prefixLength)
{
    //trim to isolate cmd and argument
    const cmd = message.content.split(' ').shift().trim().slice(prefixLength).toLowerCase();
    //cmd does not exist
    if(cmd.length === 0){return;}

    let cmd2 = client.commands.get(cmd);
    if(!cmd2){client.commands.get(client.alias.get(cmd));}
    //run cmd if cmd exists
    if(cmd2)
    {
        cmd2.run(client, message, arg);
    }       
}

// //send message in the block of code (as seen when you write something like: `code`)
// function sayCoded(message, messageToSay)
// {
//     message.channel.send("<@"+message.author.id + ">" + ` ${messageToSay}`);
// }
//---------------------
//-- login thing idk --
//---------------------
client.login(process.env.TOKEN)