const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load Status");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir=> {
        //make sure its a js
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
        
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}/`);

            if (pull.name){
                this.client.commands.set(pull.name, pull);
            } 
            else{
                continue;
            }
        }

        if(pull.aliases && Array.isArray(pull)){
            pull.aliases.forEach(alias => this.client.aliases.set(alias, pull.name));
        }
    });
}