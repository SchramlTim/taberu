<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class DatabaseSetup extends AbstractMigration
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
        $users = $this->table('users');
        $users->addColumn('username', 'string', ['limit' => 40])
            ->addColumn('first_name', 'string', ['limit' => 50])
            ->addColumn('last_name', 'string', ['limit' => 50])
            ->addColumn('password', 'string', ['limit' => 100])
            ->addColumn('password_salt', 'string', ['limit' => 100])
            ->addColumn('phone_number', 'string', ['limit' => 20, 'null' => true])
            ->addColumn('paypal_username', 'string', ['limit' => 40, 'null' => true])
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->addIndex(['username'], ['unique' => true])
            ->create();

        $departments = $this->table('departments');
        $departments->addColumn('name', 'string', ['limit' => 50])
            ->addColumn('description', 'string', ['limit' => 50])
            ->addColumn('location', 'string', ['limit' => 50])
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $bowls = $this->table('bowls');
        $bowls->addColumn('creator_id', 'integer')
            ->addColumn('name', 'string')
            ->addColumn('description', 'string')
            ->addColumn('order_deadline', 'datetime')
            ->addColumn('arrive_date', 'datetime')
            ->addColumn('menu_id', 'integer')
            ->addColumn('status', 'string')
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $user2bowl = $this->table('user2bowl');
        $user2bowl->addColumn('bowl_id', 'integer')
            ->addColumn('user_id', 'integer')
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $orders = $this->table('orders');
        $orders->addColumn('bowl_id', 'integer')
            ->addColumn('user_id', 'integer')
            ->addColumn('final_price', 'float')
            ->addColumn('payment_method', 'string')
            ->addColumn('payment_status', 'string')
            ->addColumn('order_status', 'string')
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $orderItems = $this->table('order_items');
        $orderItems->addColumn('order_id', 'integer')
            ->addColumn('name', 'string')
            ->addColumn('price', 'float')
            ->addColumn('count', 'integer')
            ->addColumn('additional_information', 'string', ['limit' => 200])
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $menus = $this->table('menus');
        $menus->addColumn('name', 'string')
            ->addColumn('description', 'string')
            ->addColumn('creator_id', 'integer', ['null' => true])
            ->addColumn('restaurant_id', 'integer', ['null' => true])
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $menu_items = $this->table('menu_items');
        $menu_items->addColumn('menu_id', 'integer')
            ->addColumn('name', 'string')
            ->addColumn('description', 'string')
            ->addColumn('price', 'float')
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $menu2category = $this->table('menu2category');
        $menu2category->addColumn('menu_id', 'integer')
            ->addColumn('category_id', 'integer')
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $category = $this->table('categories');
        $category->addColumn('name', 'string')
            ->addColumn('icon_url', 'string')
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();

        $restaurant = $this->table('restaurants');
        $restaurant->addColumn('name', 'string')
            ->addColumn('street', 'string')
            ->addColumn('street_nr', 'string')
            ->addColumn('zip', 'string')
            ->addColumn('city', 'string')
            ->addColumn('description', 'string')
            ->addColumn('phone_number', 'string')
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addColumn('updated', 'datetime', ['null' => true])
            ->create();
    }
}
