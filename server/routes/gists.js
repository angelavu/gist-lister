let GitHub = require('github-api');
let express = require('express');
let router = express.Router();
const token = require('./tokens');

let getGitHub = function() {
    let gh;

    gh = new GitHub({
        token: token
    });

    return gh;
};

router.get('/get-basic-list', function(request, response) {
    console.log('GET BASIC LIST CALLED');
    let gh = getGitHub();
    const me = gh.getUser();
    console.log('ME', me);
    me
        .listGists()
        .then(function({ data }) {
            console.log('FILES PROMISE', Object.keys(data[0].files));
            const results = data.map(item => ({
                htmlUrl: item.html_url,
                id: item.id,
                gitPullUrl: item.git_pull_url,
                description: item.description,
                ownerLogin: item.owner.login,
                avatarUrl: item.owner.avatar_url,
                files: Object.keys(item.files)
            }));
            response.status(200).send({
                count: results.length,
                result: results
            });
        })
        .catch(function(err) {
            console.log('USER Promise Rejected', err);
            response.status(500).send({ result: err });
        });
});

module.exports = router;
