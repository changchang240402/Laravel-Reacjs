<?php

namespace App\Repositories\Url;

use App\Models\Url;
use App\Repositories\Url\UrlRepositoryInterface;
use App\Repositories\BaseRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Database\Eloquent\Builder;
class UrlRepository extends BaseRepository implements UrlRepositoryInterface
{
    public function getModel()
    {
        return Url::class;
    }

    public function findShortLink($code){
        return $this->model->where('code','=',$code)->where('updated_at', '>=', Carbon::now()->subDays(7))->first();
    }

    public function findCode($code){
        return $this->model->where('code', '=', $code)->first();
    }

    public function getUrlHistory(){
        $user_id = 1;
        return $this->model->where('user_id','=',$user_id)->get();
    }

    public function findByUsre($id){
        $user_id = 1;
        return $this->model->where('id','=',$id)->where('user_id','=',$user_id)->first();
    }
}