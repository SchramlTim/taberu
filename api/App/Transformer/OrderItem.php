<?php

namespace Taberu\Transformer;

use Taberu\Model\OrderItem as OrderItemModel;

class OrderItem extends JsonTransformer
{
    private OrderItemModel $orderItem;

    public function __construct(OrderItemModel $orderItem)
    {
        $this->orderItem = $orderItem;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->orderItem->getLink(),
            'id' => $this->orderItem->getId(),
            'orderId' => $this->orderItem->getOrderId(),
            'name' => $this->orderItem->getName(),
            'price' => $this->orderItem->getPrice(),
            'count' => $this->orderItem->getCount(),
            'totalSum' => $this->orderItem->getTotalSum(),
            'additionalInformation' => $this->orderItem->getAdditionalInformation(),
        ];

        return $data;
    }
}
