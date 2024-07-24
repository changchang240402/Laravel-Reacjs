<?php

namespace App\Http\Controllers;

use App\Http\Requests\Url\UrlRequest;
use App\Models\Url;
use App\Services\UrlService;
use Illuminate\Http\Request;

class UrlController extends Controller
{

    protected  $urlService;

    public function __construct(UrlService $urlService)
    {
        $this->urlService = $urlService;
    }
    
    public function createUrl(UrlRequest $request)
    {
        try {
            $validated = $request->validated();
            $hash = hash('sha256', $validated['url']);
            $validated['user_id'] = auth()->id();
            $validated['hash'] = $hash . $validated['user_id'];
            $create = $this->urlService->createUrl($validated);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Create successfully!',
            'data' => $create
        ], 201);
    }

    public function findShortLink($code)
    {
        try {
            $data = $this->urlService->findShortLink($code);
            if (!$data) {
                $code_data = $this->urlService->findCode($code);
                if(!$code_data){
                    return response()->json([
                        'success' => true,
                        'message' => 'Không tồn tại',
                    ], 404);
                }
                return response()->json([
                    'success' => true,
                    'message' => 'Hết hạn url',
                    'code' => $code_data
                ], 403);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true,
            'message' => 'successfully!',
            'data' => $data
        ], 200);
    }

    public function getUrlByUser()
    {
        try {
            $data = $this->urlService->getUrlByUser();
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true,
            'message' => 'successfully!',
            'data' => $data
        ], 200);
    }

    public function updateUrl($code)
    {
        try {
            $data = $this->urlService->findShortLink($code);
            if ($data) {
                return response()->json([
                    'success' => true,
                    'message' => 'Còn hạn',
                    'code' => $data
                ], 403);
            }
            $code_data = $this->urlService->findCode($code);
            if (!$code_data) {
                return response()->json(['message' => 'No data found'], 422);
            }
            $date = date('YmdHis');
            $sort_Link = $code_data['url'] . $date;
            $code_data->code = substr(hash('sha256', $sort_Link), 0, 10);
            $code_data->save();
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true,
            'message' => 'successfully!',
            'data' => $code_data
        ], 200);
    }

    public function deleteUrl($id)
    {
        try {
            $url = $this->urlService->findByUser($id);
            if (!$url) {
                return response()->json([
                    'success' => false,
                    'message' => "không có quyền",
                ], 403);
            }
            $delete = $this->urlService->deleteUrl($id);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'orderDetail' => $delete,
            'delete' => 'Success',
        ], 200);
    }
}
