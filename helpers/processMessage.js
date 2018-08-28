const API_AI_TOKEN = '5a5107581c214ea7a348a117e15c13cb';
const FACEBOOK_ACCESS_TOKEN = 'EAAD37QlkuUYBAEGV1ARxY4mDx58FNYhoIAPeAtNldnQh5BSbjPwnwkKOtgkeNoHTrFxICglNaAMl2wd3dLVPx9swhatpoVunHSc2MyMxhmoKsbyP53gmqPw9xku6ZA31aOs7J7BsSFA1HhuAQZA3WuD4Fp9opEbKElHCpdvAinHDyfwFG7';

const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text }
        }
    }, (error, response) => {
        if(error) {
            console.log('Error sending message: ', error);
        } else if(response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'jarvis_bot'});
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', (error) => {
        console.log(error);
    });

    apiaiSession.end()
}