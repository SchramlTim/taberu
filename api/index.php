<?php
error_reporting(E_ALL & ~E_DEPRECATED & ~E_WARNING);

use Taberu\App;

require __DIR__ . '/vendor/autoload.php';

$app = (new App())->get();
$app->run();
