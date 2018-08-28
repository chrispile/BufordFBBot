module.exports =  (req, res) => {
    const hubChallenge = req.query['hub.challenge'];
    const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === 'jarvis_bot');

    if(hubMode && verifyTokenMatches) {
        console.log('VERIFICATION SUCCESS');
        res.status(200).send(hubChallenge);
    } else {
        console.log('VERIFICATION FAILED');
        res.status(403).end();
    }
};