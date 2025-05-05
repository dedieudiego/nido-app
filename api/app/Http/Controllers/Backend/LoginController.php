<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Mail\PassRecoverMail;
use App\PassReset;
use App\User;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;

use Exception;
use Auth;

class LoginController extends Controller
{

  public function login(Request $request)
  {
    try {

      $validator = Validator::make($request->all(), [
        'email' => 'required',
        'password' => 'required',
      ]);

      if ($validator->fails()) {
        return redirect()->back()->withErrors($validator->errors())->withInput();
      }

      $credentials = $request->only('email', 'password');

      if (Auth::attempt($credentials)) {
        if (Auth::user()->hasAnyRole(['administrator', 'manager']))
          return redirect('/dashboard');
        else
          return redirect('/index');
      } else {
        $validator->errors()->add('email', 'Las credenciales de acceso no coinciden con nuestros registros.');
        return redirect()->back()->withErrors($validator->errors())->withInput();
      }
    } catch (Exception $ex) {
      return redirect()->back()->withErrors($ex->getMessage())->withInput();
    }
  }

  public function logout()
  {
    try {

      Auth::logout();

      return redirect('/login');
    } catch (\Exception $ex) {
      return Redirect::back()->withErrors($ex->getMessage());
    }
  }

  public function index()
  {
    try {
      if (empty(Auth::user())) {
        return view('login');
      } else {
        if (Auth::user()->hasAnyRole(['administrator', 'manager']))
          return redirect('/dashboard');
        else
          return view('online.index');
      }
    } catch (Exception $ex) {
      return Redirect::back()->withErrors($ex->getMessage());
    }
  }

  public function recovery()
  {
    session()->forget('success');
    return view('mails.recuperarclave');
  }

  public function recoverypass(Request $request)
  {

    if (empty($request->email)) {
      return Redirect::back()->withErrors('Ingrese una cuenta válida de email');
    }

    /* Validar Email */
    $user = DB::table('users')->where('email', $request->email)->first();

    if (empty($user)) {
      return Redirect::back()->withErrors('El email no se encuentra registrado');
    }

    /* Enviar Aviso Por Mail */
    $token = md5(date('Y-m-d h:i:s'));
    $pass = new PassReset();
    $pass->email = $user->email;
    $pass->token = $token;
    $pass->created_at = date('Y-m-d h:i:s');
    $pass->updated_at = null;
    $pass->save();

    $passemail = new \stdClass();
    $passemail->nombreUsuario = $user->name;
    $passemail->linkRecover = 'http://horneroapp.com/confirmation/'.$token;
    $passemail->sender = 'Hornero App';

    if (!empty($user->email)) {
      Mail::to($user->email)->send(new PassRecoverMail($passemail));
    }

    /* Retornar a la página con éxito */
    return Redirect::back()->with('account', 'Verifique su cuenta de correo.');
  }

  public function confirmation($token)
  {

    if (empty($token)) {
      return Redirect::back()->withErrors('No se pude verificar el token');
    }

    $user = PassReset::where('token', $token)->whereNull('updated_at')->select('*')->first();

    if (empty($user)) {
      return Redirect::back()->withErrors('No se pudo verificar la cuenta');
    }

    return view('layouts.confirmation', ['usermail' => $user->email, 'token' => $token]);
  }

  public function confirmationpass(Request $request)
  {

    $validation = Validator::make($request->all(), [
      'email' => 'required',
      'password' => 'required',
      'token' => 'required'
    ]);
    if ($validation->fails()) {
      return Redirect::back()->withErrors($validation->errors());
    }

    /* Actualizar Pass */
    $usr = User::where('email', $request->email)->first();
    if (!empty($usr)) {
      $usr->password = bcrypt($request->password);
      $usr->update();
      /* Anular token */
      $rst = PassReset::where('token', $request->token)->where('email', $request->email)->first();
      $rst->updated_at = date('Y-m-d h:i:s');
      $rst->update();
    } else {
      return Redirect::back()->withErrors('Error al validar usuario');
    }

    Session::put('newpass', 'Clave modificada con éxito');
    return view('login');
  }
}
