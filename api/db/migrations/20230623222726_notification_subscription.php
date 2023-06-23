<?php
declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class NotificationSubscription extends AbstractMigration
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
        $subscription = $this->table('subscription');
        $subscription
            ->addColumn('user_id', 'string', ['limit' => 50])
            ->addColumn('endpoint_url', 'string', ['limit' => 200])
            ->addColumn('public_key', 'string', ['limit' => 100])
            ->addColumn('auth_token', 'string', ['limit' => 100])
            ->addColumn('created', 'datetime', ['timezone' => true, 'default' => \Phinx\Util\Literal::from('now()')])
            ->addIndex(['user_id'])
            ->create();
    }
}
