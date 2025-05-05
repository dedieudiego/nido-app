<?php

namespace App\Http\Controllers;

use App\User;
use App\PassReset;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

use Carbon\Carbon;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Mail\PassRecoverMail;
use App\Mail\GenericMsgMail;

use Faker\Factory as Fake;

/**
 * @group Auth
 *
 * APIs for managing the User Authentication
 */
class AuthController extends Controller
{
  public $loginAfterSignUp = true;


  public function loginWithGoogle(Request $request)
  {

    $validator = Validator::make($request->all(), [
      'google_id' => 'required',
      'email' => 'required|email',
      'name' => 'required',
      'lastname' => 'required',
    ]);


    if ($validator->fails()) {
      return  response()->json([
        'status' => 'error',
        'message' => 'Login Google: Error de campos.',
        'error' => $validator->messages(),
      ], 500);
    }

    $request->password = bcrypt($request->google_id);

    $user = User::where('google_id', $request->google_id)->first();
    if (empty($user)) {
      //REGISTRO
      try {
        $usr = User::where('email', $request->email)->select('email')->first();
        if (!empty($usr->email)) {
          return  response()->json([
            'status' => 'Error',
            'message' => 'El correo ya está registrado.',
          ], 500);
        }

        $user = new User();
        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->google_id = $request->google_id;
        $user->save();

        $user = User::where('email', $user->email)->first();
        $user->assignRole('customer');
      } catch (\Exception $ex) {
        return  response()->json([
          'status' => 'Error',
          'message' => $ex->getMessage()
        ], 500);
      }
    }

    return $this->login($request);
  }


  public function register(Request $request)
  {
    try {
      $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'name' => 'required',
        'lastname' => 'required',
        'password' => 'required'
      ]);

      if ($validator->fails()) {
        return  response()->json([
          'status' => 'Error',
          'message' => 'Error de campos.',
          'error' => $validator->messages(),
        ], 500);
      }

      $usr = User::where('email', $request->email)->select('email')->first();
      if (!empty($usr->email)) {
        return  response()->json([
          'status' => 'Error',
          'message' => 'El correo ya está registrado.',
        ], 500);
      }

      $user = new User();
      $user->name = $request->name;
      $user->lastname = $request->lastname;
      $user->email = $request->email;
      $user->password = bcrypt($request->password);
      $user->google_id = $request->google_id;
      $user->save();

      $user = User::where('email', $user->email)->first();
      $user->assignRole('customer');

      if ($this->loginAfterSignUp) {
        return $this->login($request);
      } else {
        $this->setNotificationsDefault($user->id);
        return response()->json([
          'status' => 'ok',
          'data' => $user
        ], 200);
      }
    } catch (\Exception $ex) {
      return  response()->json([
        'status' => 'Error',
        'message' => 'Error de campos.',
        'error' => $ex->getMessage(),
      ], 500);
    }
  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required',
      'password' => 'required'
    ]);

    if ($validator->fails()) {
      return  response()->json([
        'status' => 'error',
        'message' => 'Login: Error de campos.',
        'error' => $validator->messages(),
      ], 500);
    }

    $input = $request->only('email', 'password');
    $jwt_token = null;

    if (!$jwt_token = JWTAuth::attempt($input)) {
      return  response()->json([
        'status' => 'error',
        'message' => 'Los datos ingresados no son correctos. Por favor intenta nuevamente.',
      ], 401);
    }
    return $this->respondWithToken($jwt_token, $input['email']);
  }

  public function logout(Request $request)
  {
    $this->validate($request, [
      'token' => 'required'
    ]);

    try {
      JWTAuth::invalidate($request->token);
      return  response()->json([
        'status' => 'ok',
        'message' => 'Session closed sucesfully.'
      ]);
    } catch (JWTException  $exception) {
      return  response()->json([
        'status' => 'unknown_error',
        'message' => 'Unkown error closing session.'
      ], 500);
    }
  }

  public function forgotPassword(Request $request)
  {

    $validator = Validator::make($request->all(), [
      'email' => 'required',
    ]);

    if ($validator->fails()) {
      return  response()->json([
        'status' => 'Error',
        'message' => 'Error de campos.',
        'error' => $validator->messages(),
      ], 500);
    }

    $user = User::where('email', '=', $request->email)->first();
    if (!$user) {
      return  response()->json([
        'status' => 'Error',
        'message' => 'El usuario no existe.'
      ], 500);
    }

    $token = md5(date('Y-m-d h:i:s'));
    $pass = new PassReset();
    $pass->email = $user->email;
    $pass->token = $token;
    $pass->created_at = date('Y-m-d h:i:s');
    $pass->updated_at = null;
    $pass->save();

    $passemail = new \stdClass();
    $passemail->nombreUsuario = $user->name;
    $passemail->linkRecover = env('APP_URL') . '/confirmation/' . $token;
    $passemail->sender = 'Horneros App';

    if (!empty($user->email)) {
      Mail::to($user->email)->send(new PassRecoverMail($passemail));
    }

    return response()->json([
      'status' => 'Ok'
    ], 200);
  }


  public function resetPassword(Request $request)
  {

    $validator = Validator::make($request->all(), [
      'token' => 'required',
      'email' => 'required',
    ]);

    if ($validator->fails()) {
      return  response()->json([
        'status' => 'Error',
        'message' => $validator->messages()
      ], 500);
    }

    $tokenData = PassReset::where('token', $request->token)->where('email', $request->email)->select('token', 'email')->get()->first();

    if (!isset($tokenData)) {
      return  response()->json([
        'status' => 'Error',
        'message' => 'El token no es válido.'
      ], 500);
    }

    $user = User::where('email', $tokenData->email)->first();

    if (!$user) {
      return  response()->json([
        'status' => 'Error',
        'message' => 'Usuario no encontrado.'
      ], 500);
    }

    //Save new password
    $user->password = bcrypt($request->password);
    $user->update();

    //Delete the token
    PassReset::where('email', $user->email)->delete();

    //Send Email Reset Success Email
    if ($this->sendSuccessEmail($tokenData->email)) {
      return  response()->json([
        'status' => 'Ok'
      ], 200);
    } else {
      return  response()->json([
        'status' => 'Error',
        'message' => 'Error de red al enviar el correo electrónico.'
      ], 500);
    }
  }

  private function sendSuccessEmail($email)
  {
    $user = User::where('email', $email)->select('name', 'email')->first();

    try {
      $message = 'Hola! Tu contraseña fue recuperada con éxito.';
      $objMail = new \stdClass();
      $objMail->message = $message;
      $objMail->sender = 'Horneros App';

      Mail::to($user->email)->send(new GenericMsgMail($objMail));

      return true;
    } catch (\Exception $e) {
      return false;
    }
  }

  protected function respondWithToken($token, $email)
  {

    $user = User::where('email', $email)->first();
    $userRoles = $user->getRoleNames();

    return response()->json([
      'access_token' => $token,
      'email' => $user->email,
      'name' => $user->name,
      'lastname' => $user->lastname,
      'google_id' => $user->google_id,
      'roles' => $userRoles
    ], 200);
  }

  public function getAuthUser(Request $request)
  {
    $this->validate($request, [
      'token' => 'required'
    ]);

    $user = JWTAuth::authenticate($request->token);
    return  response()->json(['user' => $user]);
  }

  public function changePassword(Request $request)
  {
    try {
      $validator = Validator::make($request->all(), [
        'token' => 'required',
        'currentpass' => 'required',
        'newpass' => 'required',
      ]);

      if ($validator->fails()) {
        return response()->json([
          'status' => 'Error',
          'message' => $validator->messages()
        ], 500);
      }

      if (password_verify($request->currentpass, Auth::user()->password)) {
        $user = User::find(Auth::user()->id);
        $user->password = bcrypt($request->newpass);
        $user->save();

        $this->logout($request);
      } else {
        return response()->json([
          'status' => 'Error',
          'message' => 'La contraseña actual ingresada es incorrecta'
        ], 500);
      }

      return response()->json([
        'status' => 'Ok',
        'message' => 'La contraseña fue modificada con éxito, debe reingresar.'
      ], 200);
    } catch (Exception $ex) {
      return  response()->json([
        'status' => 'Error',
        'message' => $ex->getMessage()
      ], 500);
    }
  }

  public function redirectToProvider()
  {
    return Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
  }

  public function handleProviderCallback()
  {
    try {

      $providerUser = Socialite::driver('google')->stateless()->user();

      $user = User::query()->firstOrNew(['email' => $providerUser->getEmail()]);

      if (!$user->exists) {
        $user->name = $providerUser->user['given_name'];
        $user->lastname = $providerUser->user['family_name'];
        $user->email = $providerUser->email;
        $user->password = bcrypt(md5(uniqid(rand(), true)));
        $user->google_id = $providerUser->id;
        $user->save();
      }

      $user = User::where('email', $providerUser->email)->first();

      if (!empty($user)) {
        $token = JWTAuth::fromUser($user);
        $userRoles = $user->getRoleNames();

        return response()->json([
          'access_token' => $token,
          'name' => $user->name,
          'lastname' => $user->lastname,
          'roles' => $userRoles
        ]);
      } else {
        throw new Exception("El usuario no existe", 1);
      }
    } catch (\Exception $ex) {
      return response()->json([
        'status' => 'error',
        'message' => $ex->getMessage(),
      ]);
    }
  }

  public function delete()
  {
    try {
      //TODO >> QUÉ ES ESO DEL FAKER??? PORQUÉ HACE ESO?
      DB::transaction(function () {

        $faker = Fake::create();

        $user = Auth::user();
        $user->email = $faker->unique()->safeEmail;
        $user->password = '';
        $user->name = '';
        $user->lastname = '';
        $user->email_verified_at = null;
        $user->remember_token = $faker->word;
        $user->deleted_at = Carbon::now();
        $user->update();
      }, 5);

      return response()->json([
        'status' => 'ok',
        'message' => 'Su cuenta ha sido borrada.'
      ]);
    } catch (\Exception $ex) {
      return response()->json([
        'status' => 'error',
        'message' => $ex->getMessage()
      ]);
    }
  }

  public function update(Request $request)
  {
    try {
      $user = Auth::user();
      $user->name = $request->name;
      $user->lastname = $request->lastname;
      $user->save();

      return $this->respondWithToken($request->token, $user->email);
    } catch (\Exception $ex) {
      return response()->json([
        'status' => 'error',
        'message' => $ex->getMessage()
      ]);
    }
  }
}
