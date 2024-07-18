<?php

namespace App\Services;

use App\Models\Url;
use App\Repositories\Url\UrlRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UrlService
{
    protected $urlRepository;

    public function __construct(
        UrlRepository $urlRepository,
    ) {
        $this->urlRepository = $urlRepository;
    }

    public function createUrl($data)
    {
        $date = date('YmdHis');
        $sort_Link = $data['url'].$date;
        $data['code'] = substr(hash('sha256', $sort_Link), 0, 10);
        try {
            $data = $this->urlRepository->create($data);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $data;
    }

    public function deleteUrl($id){
        try {
            $delete = $this->urlRepository->delete($id);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $delete;
    }

    public function findShortLink($code){
        return $this->urlRepository->findShortLink($code);
    }

    public function findCode($code){
        return $this->urlRepository->findCode($code);
    }

    public function findByUsre($id){
        return $this->urlRepository->findByUsre($id);
    }
}