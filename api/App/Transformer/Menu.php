<?php

namespace Taberu\Transformer;

use Taberu\Model\Menu as MenuModel;

class Menu extends JsonTransformer
{
    private MenuModel $menu;

    public function __construct(MenuModel $menu)
    {
        $this->menu = $menu;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->menu->getLink(),
            'id' => $this->menu->getId(),
            'name' => $this->menu->getName(),
            'description' => $this->menu->getDescription(),
            'restaurantId' => $this->menu->getRestaurantId(),
            'creatorId' => $this->menu->getCreatorId()
        ];

        return $data;
    }
}
