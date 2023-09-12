const controllers = {};

controllers.test = async (req, res) => {
    try {
        return res.reply(messages.success())
    } catch (error) {
        console.log(error)
        return res.reply(messages.server_error())
    }
}

module.exports = controllers;