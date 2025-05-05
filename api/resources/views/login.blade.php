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
                <div class="col-md-4 col-11 mx-auto mx-sm-0">
                    <div class="row pb-60">
                        <div class="col-12 text-center">
                            <img src="{{ asset('img/banner-nido.png') }}" alt="HorneroApp" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-10 mx-auto text-center">
                            <form action="{{ route('login') }}" method="POST">
                                @csrf

                                <div class="pb-15">
                                    <h5 class="txt16 text-500 espaciado_1">
                                        INGRESAR
                                    </h5>
                                </div>
                                <div class="pb-15">
                                    <input type="email"
                                        class="form-control h-50px @error('email') is-invalid @enderror" id="pemail"
                                        name="email" aria-describedby="emailHelp" placeholder="example@email.com"
                                        value="{{ old('email') ?? '' }}" />
                                    <div role="alert" class="invalid-feedback txt12">
                                        @error('email')
                                            {{ $errors->first('email') ?? '' }}
                                        @enderror
                                    </div>
                                </div>
                                <div class="pb-15">
                                    <div class="input-group viewPassword">
                                        <input type="password"
                                            class="form-control h-50px @error('password') is-invalid @enderror"
                                            id="ppassword" name="password" value="{{ old('password') ?? '' }}"
                                            placeholder="Ingresa tu contraseña" aria-describedby="basic-addon1" />
                                        <span class="input-group-text d" id="preview_icon"
                                            style="@error('password') border-color: red; @enderror">
                                            <img src="{{ asset('img/eye-slash.svg') }}" id="eyeIcon" />
                                        </span>
                                        <div role="alert" class="invalid-feedback txt12">
                                            @error('password')
                                                {{ $errors->first('password') ?? '' }}
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                                <div class="pb-15">
                                    <button type="submit" class="btn btn-orange w-100 h-50px">
                                        Ingresar
                                    </button>
                                </div>

                                @if (session()->has('newpass'))
                                    <div class="alert alert-success">
                                        {{ session()->get('newpass') }}
                                    </div>
                                @endif

                                
                                <div class="pt-40 text-center d-flex justify-content-between">
                                    <!--<a href="{{ route('signup') }}" class="linkSimple">Registrarme</a>-->
                                    <a href="{{ url('/recovery') }}" class="linkSimple">Olvidé mi contraseña</a>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="footerLogin pt-80 text-center">
                                2024 - Todos los derechos reservados. Desarrollo:
                                <a href="https://www.avradev.com" target="_blank" class="linkSimple">Avradev.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!--FIN MAIN-->

    <script src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>

    <script>
        const PASSWORD = "password";
        const TEXT = "text";

        const passwordIcon = document.querySelector("#preview_icon");
        const passwordField = document.querySelector("#ppassword");
        const eyeIcon = document.querySelector("#eyeIcon");

        function togglePassword() {
            if (passwordField.type === PASSWORD) {
                passwordField.type = TEXT;
                eyeIcon.src = "img/eye.svg";
            } else {
                passwordField.type = PASSWORD;
                eyeIcon.src = "img/eye-slash.svg";
            }
        }

        passwordIcon.addEventListener("click", togglePassword);

        setTimeout(function() {
            $(".alert").fadeTo(1000, 0).slideUp(500, function() {
                $(this).remove();
                @php
                    Session::forget('newpass');
                @endphp
            });
        }, 3000);
    </script>

</body>

</html>
