<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Nido;
use App\Foto;
use App\Ubicacion;

use Illuminate\Http\Request;

class NidoController extends Controller
{
  public function index()
  {
    try {
      $nidos = Nido::with(['foto', 'ubicacion'])->get();
      return response()->json($nidos);
    } catch (\Exception $e) {
      return response()->json(['message' => 'Error fetching Nidos'], 500);
    }
  }

  public function show($id)
  {
    try {
      $nido = Nido::with(['foto', 'ubicacion'])->findOrFail($id);
      return response()->json($nido);
    } catch (\Exception $e) {
      return response()->json(['message' => 'Error fetching Nidos'], 500);
    }
  }

  public function store(Request $request)
  {
    try {
      $validator = Validator::make($request->all(), [
        'actividad' => 'required|string',
        'altura' => 'required|numeric',
        'contexto' => 'required|string',
        'estadio' => 'required|integer',
        'fuente' => 'required|string',
        'lluvia' => 'required|string',
        'tipoDeFuente' => 'required|string',
        'photo' => 'required',
        'ubicacion' => 'required',
      ]);


      if ($validator->fails()) {
        return  response()->json([
          'status' => 'error',
          'message' => 'Crear Nido: Error de campos.',
          'error' => $validator->messages(),
        ], 500);
      }

      $nido = Nido::create($request->all());
      $nidoId = $nido->id;

      //photo
      $photo = new Foto();
      $photo->uri = $request->photo['uri'];
      $photo->width = $request->photo['width'];
      $photo->height = $request->photo['height'];
      $photo->nido_id = $nidoId;
      $photo->save();

      //ubicacion
      $notif = new Ubicacion();
      $notif->city = $request->ubicacion['city'];
      $notif->country = $request->ubicacion['country'];
      $notif->latitude = $request->ubicacion['latitude'];
      $notif->longitude = $request->ubicacion['longitude'];
      $notif->postalCode = $request->ubicacion['postalCode'];
      $notif->region = $request->ubicacion['region'];
      $notif->subregion = $request->ubicacion['subregion'];
      $notif->nido_id = $nidoId;
      $notif->save();


      return response()->json($nido, 201);
    } catch (\Exception $e) {
      return response()->json(['message' => 'Error saving Nidos'], 500);
    }
  }

  public function update(Request $request, $id)
  {
    try {
      $validator = Validator::make($request->all(), [
        'actividad' => 'string',
        'altura' => 'numeric',
        'contexto' => 'string',
        'estadio' => 'integer',
        'fuente' => 'string',
        'lluvia' => 'string',
        'tipoDeFuente' => 'string'
      ]);

      if ($validator->fails()) {
        return  response()->json([
          'status' => 'error',
          'message' => 'Actualizar Nido: Error de campos.',
          'error' => $validator->messages(),
        ], 500);
      }

      $nido = Nido::findOrFail($id);
      $nido->update($request->all());
      return response()->json($nido, 200);
    } catch (\Exception $e) {
      return response()->json(['message' => 'Error updating Nidos'], 500);
    }
  }

  public function destroy($id)
  {
    try {
      $nido = Nido::findOrFail($id);
      $nido->delete();
      return response()->json(null, 204);
    } catch (\Exception $e) {
      return response()->json(['message' => 'Error deleting Nidos'], 500);
    }
  }
}
