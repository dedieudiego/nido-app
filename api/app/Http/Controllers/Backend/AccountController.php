<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Provincia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

use Exception;

use App\User;
use App\Role;
use App\UserNotificaciones;

class AccountController extends Controller
{

  public function index()
  {
    try {
      $users = User::with(['roles', 'provincia'])->get();
      return view('account.index', ['users' => $users]);
    } catch (Exception $ex) {
      return $ex->getMessage();
    }
  }

  public function edit($id)
  {

    try {

      $user = User::with(['roles'])
        ->where('id', $id)->first();

      $roles = Role::get();

      return view('account.edit', [
        'user' => $user,
        'roles' => $roles
      ]);
    } catch (Exception $ex) {
      return redirect()->back()->withErrors($ex->getMessage())->withInput();
    }
  }

  public function updateAccount(Request $request)
  {

    try {

      $validation = Validator::make($request->all(), [
        'id' => 'required',
        'name' => 'required',
        'lastname' => 'required',
        'roleId' => 'required',
      ]);

      if ($validation->fails()) {
        return redirect()->back()->withErrors($validation->errors())->withInput();
      }

      $user = User::find($request->id);
      $user->name = $request->name;
      $user->lastname = $request->lastname;

      if ($request->password != null) {
        if ($request->password == $request->confirmpassword)
          if ($request->password != null)
            $user->password = bcrypt($request->password);
          else
            throw new Exception("Contraseña de confirmación incorrecta.", 1);
      }

      $user->update();
      $user->roles()->sync([$request->roleId]);

      return redirect('/accounts');
    } catch (Exception $ex) {
      return redirect()->back()->withErrors($ex->getMessage())->withInput();
    }
  }

  public function update(Request $request)
  {

    try {

      $validation = Validator::make($request->all(), [
        'name' => 'required',
        'lastname' => 'required',
      ]);

      if ($validation->fails()) {
        return redirect()->back()->withErrors($validation->errors())->withInput();
      }

      $user = User::find(Auth::user()->id);

      $user->name = $request->name;
      $user->lastname = $request->lastname;

      if ($request->currentpassword != null) {
        if (!Hash::check($request->currentpassword, $user->password)) {
          throw new Exception("Contraseña Actual Incorrecta.", 1);
        } else {
          if ($request->password == $request->confirmpassword) {
            if ($request->password != null) {
              $user->password = bcrypt($request->password);
            }
          } else {
            throw new Exception("Contraseña de confirmación incorrecta.", 1);
          }
        }
      }

      $user->update();
      $success = 'Usuario modificado con éxito!.';

      return view('account.profile', [
        'user' => $user,
        'success' => $success
      ]);
    } catch (Exception $ex) {
      return redirect()->back()->withErrors($ex->getMessage())->withInput();
    }
  }

  public function signup()
  {
    return view('/signup');
  }

  public function store(Request $request)
  {

    try {

      $validation = Validator::make($request->all(), [
        'name' => 'required',
        'lastname' => 'required',
        'email' => 'email',
        'password' => 'required',
        'confirmpassword' => 'required',
        'checkacept' => 'required'
      ]);

      if ($validation->fails()) {
        return redirect()->back()->withErrors($validation->errors())->withInput();
      }

      if ($request->password == $request->confirmpassword) {
        if ($request->password != null) {
          $pass = bcrypt($request->password);
        } else {
          throw new Exception("Debe ingresar una contraseña de acceso.", 1);
        }
      } else {
        throw new Exception("La confirmación de la contraseña no es correcta.", 1);
      }

      $usr = User::where('email', $request->email)->first();

      if (!empty($usr))
        throw new Exception("Cuenta de email en uso.", 1);

      $role_user = Role::where('name', 'customer')->first();
      $user = User::create([
        'name' => $request->name,
        'lastname' => $request->lastname,
        'email' => $request->email,
        'password' => $pass
      ]);

      $user->roles()->attach($role_user);

      if (!empty($user->id))
        $credentials = $request->only('email', 'password');

      if (Auth::attempt($credentials)) {
        return view('online.index');
      } else {
        throw new Exception("Hubo un problema al intentar ingresar al sitio.", 1);
      }
    } catch (Exception $ex) {
      return redirect()->back()->withErrors($ex->getMessage())->withInput();
    }
  }
}
