<?php

namespace Taberu\Transformer;

class MenuList extends JsonTransformer
{
    private array $menus;

    public function __construct(array $menus)
    {
        $this->menus = $menus;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->menus as $menu) {
            $transformer = new Menu($menu);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
