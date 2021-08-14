<?php

namespace Taberu\Transformer;

class MenuItemList extends JsonTransformer
{
    private array $menuItems;

    public function __construct(array $menuItems)
    {
        $this->menuItems = $menuItems;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->menuItems as $item) {
            $transformer = new MenuItem($item);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
