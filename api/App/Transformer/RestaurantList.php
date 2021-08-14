<?php

namespace Taberu\Transformer;

class RestaurantList extends JsonTransformer
{
    private array $restaurants;

    public function __construct(array $restaurants)
    {
        $this->restaurants = $restaurants;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->restaurants as $restaurant) {
            $transformer = new Restaurant($restaurant);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
