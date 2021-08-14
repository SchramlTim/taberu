<?php

namespace Taberu\Transformer;

class OrderList extends JsonTransformer
{
    private array $orders;

    public function __construct(array $orders)
    {
        $this->orders = $orders;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->orders as $restaurant) {
            $transformer = new Order($restaurant);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
