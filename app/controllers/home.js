const path = require('path');

const home = {
    renderPage: async (req, res) => {
        res.sendFile(path.resolve('views/home.html'))
    }
}

module.exports = home;