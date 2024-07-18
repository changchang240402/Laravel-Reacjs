<?php

namespace App\Repositories\Url;

use App\Repositories\RepositoryInterface;

interface UrlRepositoryInterface extends RepositoryInterface
{
    public function findShortLink($code);

    public function findCode($code);

    public function getUrlHistory();

    public function findByUsre($id);
}