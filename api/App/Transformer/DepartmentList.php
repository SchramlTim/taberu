<?php

namespace Taberu\Transformer;

class DepartmentList extends JsonTransformer
{
    private array $departments;

    public function __construct(array $departments)
    {
        $this->departments = $departments;
    }

    protected function transformData(): array
    {
        $dataList = [];
        foreach ($this->departments as $restaurant) {
            $transformer = new Department($restaurant);
            $dataList[] = $transformer->getArray(false);
        }

        return $dataList;
    }
}
