<?php

namespace Taberu\Utils;

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription as WebSubscription;
use Taberu\Model\Subscription;

class NotificationManager {

  public static function send(int $userId, string $message): bool
  {
    try {
      /** Subscription $subscription **/
      $userSubscriptions = Subscription::all([
        [Subscription::USER_ID, '=', $userId]
      ]); 
    } catch (\Taberu\Exception\NotFoundException $e) {
      // skip
    }
    $webSubscriptions = [];
    foreach ($userSubscriptions as $subscription) {
      $webSubscriptions[] = WebSubscription::create([
        'endpoint' => $subscription->getEndpointUrl(),
        'publicKey' => $subscription->getPublicKey(),
        'authToken' => $subscription->getAuthToken(),
      ]);
    }

    $auth = [
      'VAPID' => [
        'subject' => getenv('NOTIFICATION_SUBJECT'), // can be a mailto: or your website address
        'publicKey' => getenv('NOTIFICATION_PUBLIC_KEY'), // (recommended) uncompressed public key P-256 encoded in Base64-URL
        'privateKey' => getenv('NOTIFICATION_PRIVAT_KEY'), // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
      ]
    ]; 


    $payload = [
      'title' => $message,
      'icon' => '/logo_192x192.png', 
      'badge' => '/logo_192x192.png',
      'body' => 'Test Body', 
      'actions' => [
        [
          'title' => 'Show Bowls',
          'action' => 'https://www.google.de'
        ]
      ]
    ];
    

    $webpush = new WebPush($auth);

    foreach ($webSubscriptions as $webSub) {
      $webpush->sendOneNotification(
        $webSub,
        json_encode($payload)
      );
    }
    
    return true;
  }



}
