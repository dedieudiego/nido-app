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

<body class="registrate d-flex justify-content-center flex-column bg-white">
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

                            <form action="{{ route('signup.store') }}" method="post" enctype="multipart/form-data"
                                class="needs-validation" id="frmsave" novalidate>
                                @csrf

                                <div class="pb-15">
                                    <h5 class="txt16 text-500 espaciado_1">
                                        REGISTRATE PARA PODER REPORTAR
                                    </h5>
                                </div>
                                <div class="row pb-15">
                                    <div class="col">
                                        <input type="text"
                                            class="form-control h-50px @error('name') is-invalid @enderror"
                                            placeholder="Nombre" aria-label="Nombre" id="pname" name="name"
                                            value="{{ old('name') ?? '' }}" required />
                                    </div>
                                    <div class="col">
                                        <input type="text"
                                            class="form-control h-50px @error('lastname') is-invalid @enderror"
                                            placeholder="Apellido" aria-label="Apellido" id="plastname" name="lastname"
                                            value="{{ old('lastname') ?? '' }}" required />
                                    </div>
                                </div>
                                <div class="pb-15">
                                    <input id="pemail" name="email" type="email"
                                        class="form-control h-50px @error('email') is-invalid @enderror"
                                        placeholder="email@email.com" value="{{ old('email') ?? '' }}" required />
                                </div>
                                <div class="pb-15">
                                    <div class="input-group viewPassword">
                                        <input type="password"
                                            class="form-control h-50px pass @error('password') is-invalid @enderror"
                                            id="ppassword" name="password" placeholder="Ingresa tu contraseña"
                                            aria-describedby="basic-addon1" value="{{ old('password') ?? '' }}" />
                                        <span class="input-group-text d iconprev" id="preview_icon1"><img
                                                src="{{ asset('img/eye-slash.svg') }}" class="iconeye"
                                                id="eyeIcon1" /></span>
                                    </div>
                                </div>
                                <div class="pb-15">
                                    <div class="input-group viewPassword">
                                        <input type="password"
                                            class="form-control h-50px pass @error('confirmpassword') is-invalid @enderror"
                                            id="pconfirmpassword" name="confirmpassword"
                                            placeholder="Repetir contraseña" aria-describedby="basic-addon1"
                                            value="{{ old('confirmpassword') ?? '' }}" required />
                                        <span class="input-group-text d iconprev" id="preview_icon2"><img
                                                src="{{ asset('img/eye-slash.svg') }}" class="iconeye"
                                                id="eyeIcon2" /></span>
                                    </div>
                                </div>
                                <div class="col-auto text-start pb-15">
                                    <div class="form-check">
                                        <input id="pcheckacept" name="checkacept"
                                            class="form-check-input @error('checkacept') is-invalid @enderror"
                                            type="checkbox" id="autoSizingCheck" required />
                                        <label class="form-check-label" for="autoSizingCheck">
                                            Acepto la
                                            <a href="http://www.hornero.com/" class="linkSimple" target="_blank"
                                                style="text-decoration: underline">Política de Datos</a>
                                        </label>
                                    </div>
                                </div>
                                <div class="pb-15">
                                    <button type="submit" class="btn btn-orange w-100 h-50px">
                                        Registrarse
                                    </button>
                                </div>
                                <div class="">
                                    @if ($errors->any())
                                        <div class="alert alert-danger" role="alert">
                                            {{ $errors->first() }}
                                        </div>
                                    @endif
                                    @if (!empty($success ?? null))
                                        <div class="alert alert-success" role="alert">
                                            {{ $success }}
                                        </div>
                                    @endif
                                </div>
                                <div class="pt-40 pb-40 text-center d-flex justify-content-center">
                                    <a href="{{ url('/login') }}" class="linkSimple">Ya tengo una cuenta,
                                        ingresar</a>
                                </div>

                            </form>

                        </div>
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
                <div class="col-md-7 col-12 mx-auto mx-sm-0 bg-registro">
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators mb-20">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
                                aria-label="Slide 4"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active text-center">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="slider_tit pb-100">¿Cómo reportar?</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 pb-30">
                                        <img src="img/ilustReporta.png" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <h5 class="slider_subtit">Reportá</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <p class="slider_text pb-50">
                                            Registrate y presioná “REPORTAR”
                                            <br class="d-none d-sm-block" />
                                            para notificar el insecto que encontraste
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item text-center">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="slider_tit pb-100">¿Cómo reportar?</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 pb-30">
                                        <img src="img/ilustSacaFotos.png" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <h5 class="slider_subtit">Sacá fotos</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <p class="slider_text pb-50">
                                            Sacá dos fotos al insecto, subilas por medio del<br
                                                class="d-none d-sm-block" />
                                            formulario, y determiná el hábitat y la ubicación<br
                                                class="d-none d-sm-block" />
                                            donde lo encontraste, y seguí las indicaciones<br
                                                class="d-none d-sm-block" />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item text-center">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="slider_tit pb-100">¿Cómo reportar?</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 pb-30">
                                        <img src="img/ilusEnviaReporte.png" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <h5 class="slider_subtit">ENVIÁ el reporte</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <p class="slider_text pb-50">
                                            Tu reporte se enviará con todos los datos<br class="d-none d-sm-block" />
                                            recolectados para ser analizados
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item text-center">
                                <div class="row">
                                    <div class="col-12">
                                        <h4 class="slider_tit pb-100">¿Cómo reportar?</h4>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 pb-30">
                                        <img src="img/ilusRespuesta.png" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <h5 class="slider_subtit">recibe una respuesta</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <p class="slider_text pb-50">
                                            Una vez analizado el reporte, recibirás una<br class="d-none d-sm-block" />
                                            respuesta en la App Hornero para que sepas si el<br
                                                class="d-none d-sm-block" />
                                            insecto que encontraste es o no una vinchuca.<br
                                                class="d-none d-sm-block" />
                                            Si aún no la descargaste, podes hacerlo desde<br
                                                class="d-none d-sm-block" />
                                            Play Store o Apple Store
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
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

        let passwordIcon = document.querySelectorAll(".iconprev");
        let passwordField = document.querySelectorAll(".pass");
        let eyeIcon = document.querySelectorAll(".iconeye");

        function togglePassword0() {
            if (passwordField[0].type === PASSWORD) {
                passwordField[0].type = TEXT;
                eyeIcon[0].src = "{{ asset('img/eye.svg') }}";
            } else {
                passwordField[0].type = PASSWORD;
                eyeIcon[0].src = "{{ asset('img/eye-slash.svg') }}";
            }
        }

        function togglePassword1() {
            if (passwordField[1].type === PASSWORD) {
                passwordField[1].type = TEXT;
                eyeIcon[1].src = "{{ asset('img/eye.svg') }}";
            } else {
                passwordField[1].type = PASSWORD;
                eyeIcon[1].src = "{{ asset('img/eye-slash.svg') }}";
            }
        }

        passwordIcon[0].addEventListener("click", togglePassword0);
        passwordIcon[1].addEventListener("click", togglePassword1);

        $(document).ready(function() {

        });
    </script>

</body>

</html>
