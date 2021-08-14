<?php

namespace Taberu\Transformer;

use Taberu\Model\Department as DepartmentModel;

class Department extends JsonTransformer
{
    private DepartmentModel $department;

    public function __construct(DepartmentModel $department)
    {
        $this->department = $department;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->department->getLink(),
            'name' => $this->department->getName(),
            'description' => $this->department->getDescription(),
            'location' => $this->department->getLocation(),
        ];

        return $data;
    }
}
