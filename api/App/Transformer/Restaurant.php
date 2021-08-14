<?php

namespace Taberu\Transformer;

use Taberu\Model\Restaurant as RestaurantModel;

class Restaurant extends JsonTransformer
{
    private RestaurantModel $restaurant;

    public function __construct(RestaurantModel $restaurant)
    {
        $this->restaurant = $restaurant;
    }

    protected function transformData(): array
    {
        $data = [
            'self' => $this->restaurant->getLink(),
            'name' => $this->restaurant->getName(),
            'description' => $this->restaurant->getDescription(),
            'street' => $this->restaurant->getStreet(),
            'streetNumber' => $this->restaurant->getStreetNumber(),
            'zip' => $this->restaurant->getZip(),
            'city' => $this->restaurant->getCity(),
            'phoneNumber' => $this->restaurant->getPhoneNumber(),
        ];

        return $data;
    }
}
