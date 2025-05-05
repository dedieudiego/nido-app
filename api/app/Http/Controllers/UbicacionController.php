<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Ubicacion;


class UbicacionController extends Controller
{
  //TODO >> AGREGAR CONTROL DE ERRORES, NADA TIENE TRY/CATCH
  public function index()
  {
    $ubicaciones = Ubicacion::all();
    return response()->json($ubicaciones);
  }

  public function show($id)
  {
    $ubicacion = Ubicacion::findOrFail($id);
    return response()->json($ubicacion);
  }

  public function update(Request $request, $id)
  {

    $validator = Validator::make($request->all(), [
      'city' => 'string',
      'country' => 'string',
      'latitude' => ['numeric', 'between:-90,90'],
      'longitude' => ['numeric', 'between:-180,180'],
      'postalCode' => 'string',
      'region' => 'string',
      'subregion' => 'string',
      'nido_id' => 'exists:nidos,id', // Asegura que el nido exista
    ]);


    if ($validator->fails()) {
      return  response()->json([
        'status' => 'error',
        'message' => 'Actualizar Ubicacion: Error de campos.',
        'error' => $validator->messages(),
      ], 500);
    }

    $ubicacion = Ubicacion::findOrFail($id);
    $ubicacion->update($request->all());
    return response()->json($ubicacion, 200);
  }

  public function destroy($id)
  {
    $ubicacion = Ubicacion::findOrFail($id);
    $ubicacion->delete();
    return response()->json(null, 204);
  }
}
