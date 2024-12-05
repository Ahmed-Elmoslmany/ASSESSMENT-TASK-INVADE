<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|email|unique:users',
        //     'password' => 'required|string|min:8',
        // ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json([
                'status' => 'fail',
                'message' => 'This email is already taken, Try another one'
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'register successfully',
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
             return response()->json([
                'status' => 'fail',
                'message' => 'Invalid credentials'
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'login successfully',
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }
}
