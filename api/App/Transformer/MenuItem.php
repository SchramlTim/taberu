<?php

namespace Taberu\Transformer;

use Taberu\Model\MenuItem as MenuItemModel;

class MenuItem extends JsonTransformer
{
    private MenuItemModel $item;

    public function __construct(MenuItemModel $item)
    {
        $this->item = $item;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->item->getLink(),
            'name' => $this->item->getName(),
            'description' => $this->item->getDescription(),
            'menuId' => $this->item->getMenuId(),
            'price' => $this->item->getPrice(),
        ];

        return $data;
    }
}
