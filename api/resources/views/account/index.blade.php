@extends('layouts.app')

@section('content')
    <link href="{{ asset('css/jquery.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/dataTables.bootstrap4.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom_datatable.css') }}" rel="stylesheet">
    <link href="{{ asset('css/loading.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jquery-ui.css') }}" rel="stylesheet">

    <script src="{{ asset('js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('js/jquery-ui.js') }}"></script>


    <!--MAIN-->
    <main>
        <div class="container-fluid padding-25">
            <div class="row">
                <div class="col-12 col-sm-12 mx-auto">
                    <div class="row">
                        <div class="col-12">
                            <div class="row mt-20 mb-20">
                                <h2>Administración de Usuarios</h2>
                            </div>
                        </div>
                    </div>

                    <!-- MAIN TABLE -->
                    <div class="table-responsive mt-10">
                        <table class="table table_results pt-10" id="results">
                            <thead>
                                <tr class="table_results_top">
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Perfil</th>
                                    <th>Provincia</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                @foreach ($users as $r)
                                    <tr>
                                        <td>{{ $r->id }}</td>
                                        <td>{{ $r->name }}</td>
                                        <td>{{ $r->lastname }}</td>
                                        <td>{{ $r->email }}</td>
                                        <td>{{ $r->phone }}</td>
                                        <td>
                                            @foreach ($r->roles as $role)
                                                {{ Str::upper($role->name) }}
                                            @endforeach
                                        </td>
                                        <td>{{ $r->provincia->nombre ?? '' }}</td>
                                        <td>
                                            <a class="btn btn-orange-outline w-100"
                                                href="{{ route('accounts.edit', ['id' => $r->id]) }}">Editar</a>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <!-- END MAIN TABLE -->
                </div>
            </div>
        </div>

        <footer class="w-100 text-center">
            <p class="footerLogin">2024 HorneroApp. Todos los derechos reservados. Desarrollo: <a href="https://avradev.com"
                    target="_blank">Avradev.com</a></p>
        </footer>
    </main>
    <!--FIN MAIN-->

    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>

    <script>
        var dt = null;
        dt = $('#results').DataTable({
            "bAutoWidth": false,
            "deferRender": true,
            dom: "Bfrtip",
            "bSort": false,
            "searching": true,
            oLanguage: {
                "sSearch": "Buscar: ",
                "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "sEmptyTable": "No se encontraron registros",
                "sInfoEmpty": "No hay registros",
                "sZeroRecords": "No hay registros",
                "oPaginate": {
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior",
                    "sFirst": "Primera",
                    "sLast": "Última"
                }
            },
            responsive: true
        });

        $('.nav-link').each(function(index, element) {
            $(this).removeClass('active');
        });

        $('#mnuUsers').addClass('active');
    </script>
@endsection
