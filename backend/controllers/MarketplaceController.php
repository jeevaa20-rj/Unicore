<?php
require_once __DIR__ . '/../models/MarketplaceItem.php';

class MarketplaceController
{

    private $model;

    public function __construct()
    {
        $this->model = new MarketplaceItem();
    }

    // GET all items
    public function index()
    {
        return $this->model->getAllItems();
    }

    // ADD item
    public function store($data)
    {
        return $this->model->addItem($data);
    }

    // UPDATE item
    public function update($id, $user_id, $data)
    {
        return $this->model->updateItem($id, $user_id, $data);
    }

    // DELETE item
    public function delete($id, $user_id)
    {
        return $this->model->deleteItem($id, $user_id);
    }
}
