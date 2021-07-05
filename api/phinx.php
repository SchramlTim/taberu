<?php

$db = parse_url(getenv("DATABASE_URL"));

$connectionArray = [
    'adapter' => 'pgsql',
    'host' => $db["host"],
    'name' => ltrim($db["path"], "/"),
    'user' => $db["user"],
    'pass' => $db["pass"],
    'port' => $db["port"],
    'charset' => 'utf8',
];

return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/db/migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/db/seeds'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => 'development',
        'production' => $connectionArray,
        'development' => $connectionArray,
        'testing' => $connectionArray
    ],
    'version_order' => 'creation'
];


