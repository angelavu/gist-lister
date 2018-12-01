var express = require('express');
var router = express.Router();
const requester = require('request');

router.get('/user', function(req, res) {
    const options = {
        url: 'https://api.github.com/users/angelavu',
        headers: {
            'User-Agent': 'request'
        }
    };

    requester(options, function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        const jsonBody = JSON.parse(body);
        console.log('body:', JSON.stringify(body, null, 4));
        res.send({ error: error, response: response, body: jsonBody });
    });
});

module.exports = router;
