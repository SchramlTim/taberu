<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CategoriesDefault extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        $category = $this->table('categories');
        $category
            ->insert(['name' => 'American', 'icon_url' => 'https://cdn-icons-png.flaticon.com/512/4727/4727200.png'])
            ->insert(['name' => 'Sushi', 'icon_url' => 'https://cdn-icons-png.flaticon.com/512/4727/4727445.png'])
            ->insert(['name' => 'China', 'icon_url' => 'https://cdn-icons-png.flaticon.com/512/4727/4727400.png'])
            ->insert(['name' => 'Vietnam', 'icon_url' => 'https://cdn-icons-png.flaticon.com/512/4727/4727383.png'])
            ->insert(['name' => 'Dessert', 'icon_url' => 'https://cdn-icons-png.flaticon.com/512/4727/4727327.png'])
            ->insert(['name' => 'Pizza', 'icon_url' => 'https://cdn-icons-png.flaticon.com/512/4727/4727378.png'])
            ->insert(['name' => 'Pasta', 'icon_url' => 'https://cdn-icons-png.flaticon.com/512/4727/4727368.png'])
            ->save();
    }
}
