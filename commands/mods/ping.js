module.exports = {
    name: "ping",
    category: "mods",
    descripton: "replies with pong",
    run: async(cl, message, args) =>
    {
        console.log("ping cmd:");
        message.channel.send("Pong!");
    }
}