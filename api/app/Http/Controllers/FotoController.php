<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Nido;
use App\Foto;

use Illuminate\Http\Request;

class FotoController extends Controller
{
  //TODO >> AGREGAR CONTROL DE ERRORES, NADA TIENE TRY/CATCH
  public function index()
  {
    $fotos = Foto::all();
    return response()->json($fotos);
  }

  public function show($id)
  {
    $foto = Foto::findOrFail($id);
    return response()->json($foto);
  }

  public function store(Request $request)
  {

    $validator = Validator::make($request->all(), [
      'uri' => 'required',
      'width' => 'required|integer',
      'height' => 'required|integer',
      'nido_id' => 'required', // Asegura que el nido exista
    ]);


    if ($validator->fails()) {
      return  response()->json([
        'status' => 'error',
        'message' => 'Crear Foto: Error de campos.',
        'error' => $validator->messages(),
      ], 500);
    }


    $foto = Foto::create($request->all());
    return response()->json($foto, 201);
  }

  public function update(Request $request, $id)
  {

    $validator = Validator::make($request->all(), [
      'uri' => 'string',
      'width' => 'integer',
      'height' => 'integer',
      'nido_id' => 'exists:nidos,id', // Asegura que el nido exista
    ]);


    if ($validator->fails()) {
      return  response()->json([
        'status' => 'error',
        'message' => 'Actualizar Foto: Error de campos.',
        'error' => $validator->messages(),
      ], 500);
    }

    $foto = Foto::findOrFail($id);
    $foto->update($request->all());
    return response()->json($foto, 200);
  }

  public function destroy($id)
  {
    $foto = Foto::findOrFail($id);
    $foto->delete();
    return response()->json(null, 204);
  }
}
