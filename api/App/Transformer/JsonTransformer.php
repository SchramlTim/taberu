<?php

namespace Taberu\Transformer;

abstract class JsonTransformer
{
    protected array $metaInformations = [
        'apiVersion' => '1.0.0',
        'context' => 'NOT_IMPLEMENTED',
        'method' => 'NOT_IMPLEMENTED',
        'params' => 'NOT_IMPLEMENTED',
    ];

    public function getJson(bool $withMeta = true): string
    {
        return json_encode($this->getArray($withMeta));
    }

    public function getArray(bool $withMeta = true): array
    {
        $structure = [];
        $data = $this->transformData();
        $structure = $data;

        if ($withMeta) {
            $structure = $this->metaInformations;
            $structure['data'] = $data;
        }
        
        return $structure;
    }

    public function mergeJson($jsons) {
        $merged = json_decode($this->getJson(), true);

        foreach ($jsons as $model => $json) {
            $merged['data'][$model] = json_decode($json, true)['data'];
        }

        return json_encode($merged);
    }

    abstract protected function transformData(): array;
}
