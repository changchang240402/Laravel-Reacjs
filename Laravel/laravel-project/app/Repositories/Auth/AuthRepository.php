<?php

namespace App\Repositories\Auth;

use App\Repositories\Auth\AuthRepositoryInterface;
use App\Models\User;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthRepository implements AuthRepositoryInterface
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function findUserByEmail($email)
    {
        return $this->user->where('email', $email)->first();
    }

    public function createAccesstoken($validated)
    {
        if (!$token = JWTAuth::attempt($validated)) {
            return false;
        }

        return $token;
    }

    public function createRefreshToken($user)
    {
        $payload = [
            'userId' => $user->id,
            'email' => $user->email,
            'exp' => config('jwt.refresh_ttl')
        ];

        $refreshToken = JWTAuth::getJwtProvider()->encode($payload);
        return $refreshToken;
    }

    public function login($token, $refreshToken)
    {
        return [
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL(),
            'user' => auth()->user()
        ];
    }

    public function register($user)
    {
        try {
            $data = User::create([
                'email' => $user['email'],
                'password' => bcrypt($user['password']),
                'name' => $user['name'],
            ]);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $data;
    }

    public function logout()
    {
        $user = Auth::user();

        if (!$user) {
            throw new Exception('User is not logged in', 401);
        }

        Auth::logout();
    }

    public function getUserProfile($userId)
    {
        return $this->user->find($userId);
    }
}