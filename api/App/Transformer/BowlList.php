<?php

namespace Taberu\Transformer;

class BowlList extends JsonTransformer
{
    private array $bowls;

    public function __construct(array $bowls)
    {
        $this->bowls = $bowls;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->bowls as $restaurant) {
            $transformer = new Bowl($restaurant);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
