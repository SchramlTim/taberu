const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {}

webpush
    .sendNotification(pushSubscription, 'Hey was geht?')
    .catch((e) => {
        console.log(e);
    });