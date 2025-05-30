<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <title>HORNERO</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet" />
    <script src="{{ asset('js/jquery-3.6.0.js') }}"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('img/favicon.png') }}" />

</head>

@php
    use Illuminate\Support\Facades\Session;
@endphp

<body class="bg-login d-flex justify-content-center flex-column">

    <!--MAIN-->
    <main>
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-11 mx-auto mx-sm-0">
                    <div class="row pb-60">
                        <div class="col-12 text-center">
                            <img src="{{ asset('img/banner-nido.png') }}" alt="HorneroApp" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-10 mx-auto text-center">

                            <div class="pb-15">
                                <h5 class="txt16 text-500 espaciado_1">
                                    NUEVA CONTRASEÑA
                                </h5>
                                <p class="mb-0 text-danger">
                                    Ingresa una nueva contraseña para recuperar el acceso.
                                </p>
                            </div>

                            <form class="form-signin" action="{{ url('/pass/confirmation') }}" method="post">
                                @csrf

                                <input type="hidden" name="token" id="inputToken" value="{{ $token }}"
                                    readonly>

                                <div class="pb-15">
                                    <input type="email" name="email" id="inputEmail" value="{{ $usermail }}"
                                        class="form-control h-50px" aria-describedby="emailHelp" placeholder="" />
                                </div>

                                <div class="pb-15">
                                    <input type="password" name="password" id="inputPass" class="form-control h-50px"
                                        placeholder="Ingrese la nueva contraseña" required autofocus />
                                </div>

                                <button class="btn btn-orange w-100 h-50px" type="submit">
                                    Confirmar
                                </button>

                            </form>

                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    @foreach ($errors->all() as $error)
                                        {{ $error }}
                                    @endforeach
                                </div>
                            @endif

                            @if (session()->has('account'))
                                <div class="alert alert-success">
                                    {{ session()->get('account') }}
                                </div>
                            @endif

                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p class="footerLogin pt-80 text-center">
                                    2022 Hornero. Todos los derechos reservados. Desarrollo:
                                    <a href="https://www.avradev.com" target="_blank" class="linkSimple">Avradev.com</a>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
    <!--FIN MAIN-->

    <script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>

    <script>
        setTimeout(function() {
            $(".alert").fadeTo(1000, 0).slideUp(500, function() {
                $(this).remove();
                @php
                    Session::forget('account');
                @endphp
            });
        }, 3000);
    </script>

</body>

</html>
