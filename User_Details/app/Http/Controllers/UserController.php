<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users;

class UserController extends Controller
{
    public function index(){
        $users = Users::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $users = new Users([
            'name' => $request->input('name'),
            'phone_number' => $request->input('phone_number'),
            'email' => $request->input('email'),
            'dob' => $request->input('dob'),
            'college_name' => $request->input('college_name'),
            'graduation_year' => $request->input('graduation_year'),
        ]);
        $users->save();
        return response()->json('User created!');
    }

    public function update(Request $request, $id)
    {
       $users = Users::find($id);
       $users->update($request->all());
       return response()->json('User updated');
    }

    public function destroy($id){
        $users = Users::find($id);
        $users->delete();
        return response()->json('User deleted');
    }

}
