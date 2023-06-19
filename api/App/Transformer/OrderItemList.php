<?php

namespace Taberu\Transformer;

class OrderItemList extends JsonTransformer
{
    private array $orderItems;

    public function __construct(array $orderItems)
    {
        $this->orderItems = $orderItems;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->orderItems as $item) {
            $transformer = new OrderItem($item);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
