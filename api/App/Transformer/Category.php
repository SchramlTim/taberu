<?php

namespace Taberu\Transformer;

use Taberu\Model\Category as CategoryModel;

class Category extends JsonTransformer
{
    private CategoryModel $category;

    public function __construct(CategoryModel $category)
    {
        $this->category = $category;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->category->getLink(),
            'id' => $this->category->getId(),
            'name' => $this->category->getName(),
            'iconUrl' => $this->category->getIconUrl()
        ];

        return $data;
    }
}
