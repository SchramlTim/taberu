<?php

namespace Taberu\Transformer;

use Taberu\Model\Order as OrderModel;

class Order extends JsonTransformer
{
    private OrderModel $order;

    public function __construct(OrderModel $order)
    {
        $this->order = $order;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->order->getLink(),
            'bowlId' => $this->order->getBowlId(),
            'userId' => $this->order->getUserId(),
            'finalPrice' => $this->order->getFinalPrice(),
            'paymentMethod' => $this->order->getPaymentMethod(),
            'paymentStatus' => $this->order->getPaymentStatus(),
            'orderStatus' => $this->order->getOrderStatus(),
        ];

        return $data;
    }
}
