<?php

namespace Taberu\Transformer;

use Taberu\Model\Bowl as BowlModel;

class Bowl extends JsonTransformer
{
    private BowlModel $bowl;

    public function __construct(BowlModel $bowl)
    {
        $this->bowl = $bowl;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->bowl->getLink(),
            'id' => $this->bowl->getId(),
            'creatorId' => $this->bowl->getCreatorID(),
            'name' => $this->bowl->getName(),
            'description' => $this->bowl->getDescription(),
            'orderDeadline' => $this->bowl->getOrderDeadline()->format('Y-m-d H:i:s'),
            'arriveDate' => $this->bowl->getArriveDate()->format('Y-m-d H:i:s'),
            'menuId' => $this->bowl->getMenuId(),
            'orders' => $this->bowl->getOrderLink(),
        ];

        return $data;
    }
}
