<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />

    <title>Hornero</title>

    @php
        use Illuminate\Support\Env;
        use Illuminate\Support\Str;
        use Illuminate\Support\Facades\Auth;
    @endphp

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet" />
    <script src="{{ asset('js/jquery-3.6.0.js') }}"></script>

    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />

    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('img/favicon.png') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('extras/datepicker/css/datepicker.css') }}" />
    <link href="{{ asset('extras/multiselect/base.css') }}" rel="stylesheet" />

</head>

<body class="bg-nxtp">
    <!--NAV -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-0 pr-10 fixed-top">
        <div class="container-fluid p-0">
            @if (Auth::user()->hasRole('customer'))
                <a class="navbar-brand col-md-2 col-xxl-2 m-0 text-start" href="{{ route('online.index') }}">
                @elseif (Auth::user()->hasAnyRole(['administrator', 'manager']))
                    <a class="navbar-brand col-md-2 col-xxl-2 m-0 text-start" href="{{ route('dashboard.index') }}">
            @endif
            <img src="{{ asset('img/banner-nido.png') }}" alt="HorneroApp" /></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    @if (Auth::user()->hasRole('customer'))

                        <li class="nav-item">
                            <a id="mnuInicio" class="nav-link active" aria-current="page"
                                href="{{ route('online.index') }}">INICIO</a>
                        </li>
                        <li class="nav-item">
                            <a id="mnuMisReportes" class="nav-link" aria-current="page"
                                href="{{ route('online.myreports') }}">MIS REPORTES</a>
                        </li>
                    @elseif (Auth::user()->hasAnyRole(['administrator', 'manager']))
                        <li class="nav-item">
                            <a id="mnuDashboard" class="nav-link" aria-current="page"
                                href="{{ route('dashboard.index') }}">PANEL DE CONTROL</a>
                        </li>

                        @if (Auth::user()->hasRole('administrator'))
                            <li class="nav-item">
                                <a id="mnuUsers" class="nav-link" aria-current="page"
                                    href="{{ route('accounts.index') }}">USUARIOS</a>
                            </li>

                            <li class="nav-item">
                                <a id="mnuStates" class="nav-link" aria-current="page"
                                    href="{{ route('states.index') }}">PROVINCIAS</a>
                            </li>
                        @endif

                    @endif

                </ul>
                <div class="d-flex userMenu justify-content-sm-start justify-content-sm-end">
                    <div class="dropdown">
                        <a class="btn btn-transparent dropdown-toggle btnNotif" role="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                class="bi bi-bell bellIcon" viewBox="0 0 16 16">
                                <path
                                    d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                            </svg>
                            <span class="badge-notif bg-danger">{{ $myNotifications->count() }}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-start dropdown-menu-md-end padding-15 menuNotif"
                            aria-labelledby="dropdownMenuButton1">
                            @foreach ($myNotifications as $n)
                                <li>
                                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        {{ $n->title . ' ' }}

                                        @if (Auth::user()->hasRole('customer'))
                                            <a href="{{ url('/expand/' . $n->reporteid) }}"
                                                target="new">{{ '#' . $n->reporteid }}</a>
                                        @elseif (Auth::user()->hasAnyRole(['administrator', 'manager']))
                                            <a href="{{ url('/dashboard/edit/' . $n->reporteid) }}"
                                                target="new">{{ '#' . $n->reporteid }}</a>
                                        @endif

                                        <button type="button" id="btnNotif_{{ $n->id }}" class="btn-close"
                                            data-bs-dismiss="alert" aria-label="Close"></button>
                                        <input id="pidnotificacion{{ $n->id }}" type="hidden"
                                            value="{{ $n->id }}" />
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>

                    <div class="dropdown">
                        <button class="dropdown-toggle btnSesion" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span>{{ Str::substr(Auth::user()->name, 0, 1) . Str::substr(Auth::user()->lastname, 0, 1) }}</span>
                            {{ Auth::user()->name }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <a class="dropdown-item" href="{{ route('account.profile') }}">Mi Perfil</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" data-bs-toggle="modal"
                                    data-bs-target="#modalSalir">Cerrar Sesión</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!--FIN NAV-->

    @yield('content')

    <!--MODAL CERRAR SESION -->
    <div class="modal fade" tabindex="-1" id="modalSalir" aria-labelledby="modalSalir" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-380">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="row">
                        <div class="col-md-12 mx-auto text-center">
                            <h5 class="txt18 text-500 text-uppercase espaciado_1 pb-20">
                                ¿Deseas cerrar sesión?
                            </h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-10 pb-20 d-flex justify-content-around mx-auto">
                            <button type="button" class="btn btn-grey h-50px pt-5" data-bs-dismiss="modal">
                                No, Cancelar
                            </button>
                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-orange h-50px pt-5">
                                    Si, Cerrar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src=" {{ asset('js/bootstrap.bundle.min.js') }} "></script>

    <script>
        $(document).ready(function() {

            var count_notifs = '{{ $myNotifications->count() }}';

            $('[id*=btnNotif_]').click(function(e) {
                var str = e.target.id;
                var res = str.split('_');
                $.ajax({
                    type: "DELETE",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    url: "{{ URL::to('/notification/destroy') }}",
                    data: {
                        id: res[1]
                    },
                    dataType: "json",
                    success: function(res) {
                        count_notifs--;
                        $('.badge-notif').html(count_notifs);
                    }
                });
            });

        });
    </script>

    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ Env::get('GOOGLE_MAP_API') }}&callback=initMap&libraries=&v=weekly"
        async></script>

</body>

</html>
