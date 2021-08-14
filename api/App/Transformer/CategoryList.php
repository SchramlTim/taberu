<?php

namespace Taberu\Transformer;

class CategoryList extends JsonTransformer
{
    private array $categories;

    public function __construct(array $categories)
    {
        $this->categories = $categories;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->categories as $categories) {
            $transformer = new Category($categories);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
