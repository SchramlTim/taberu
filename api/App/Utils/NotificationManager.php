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

    
    
    $webpush = new WebPush();

    foreach ($webSubscriptions as $webSub) {
      $webpush->queueNotification(
        $webSub,
        $message
      );
    }
    

    
    return true;
  }



}
