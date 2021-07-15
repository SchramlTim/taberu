<?php

namespace Taberu\Utils;

use PDO;

class Database
{
    static $database = null;

    public static function getDB(): PDO
    {
        if (!self::$database) {

            $db = parse_url(getenv("DATABASE_URL"));

            self::$database = new \PDO("pgsql:" . sprintf(
                "host=%s;port=%s;user=%s;password=%s;dbname=%s",
                $db["host"],
                $db["port"],
                $db["user"],
                $db["pass"],
                ltrim($db["path"], "/")
            ));

            //self::$database = new \PDO($_ENV['DB_CONNECTION_STRING'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
        }

        self::$database->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        return self::$database;
    }
}