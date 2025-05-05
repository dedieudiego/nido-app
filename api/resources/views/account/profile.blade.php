@extends('layouts.app')
@section('content')
    <!--MAIN-->
    <main>
        <div class="container-fluid padding-20">
            <div class="row">
                <div class="col-12 col-sm-12 mx-auto">

                    <!--FILTERS -->
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-sm-3 col-12 mt-4">
                                    <p class="pt-10 mb-0 txt20">MI PERFIL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--END FILTERS-->

                    <form action="{{ route('account.update') }}" method="post" enctype="multipart/form-data"
                        class="needs-validation" id="frmsave" novalidate>
                        @csrf

                        <!--MAIN -->
                        <div class="row pb-50">
                            <div class="col-md-8 col-12">
                                <div class="row">
                                    <div class="col-md-6 col-12">
                                        <div class="row mt-20">
                                            <div class="col-12">
                                                <h4 class="txt13 titDarkGreyTop text-600 w-100">
                                                    Datos de tu cuenta
                                                </h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">
                                                            Nombre
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <input id="pname" name="name"
                                                            class="form-control h-50px @error('name') is-invalid @enderror"
                                                            value="{{ $user->name ?? old('name') }}" required />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">
                                                            Apellido
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <input id="plastname" name="lastname"
                                                            class="form-control h-50px @error('lastname') is-invalid @enderror"
                                                            value="{{ $user->lastname ?? old('lastname') }}" required />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">
                                                            Teléfono
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <input name="phone"
                                                            class="form-control h-50px @error('phone') is-invalid @enderror"
                                                            value="{{ $user->phone ?? old('phone') }}" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">
                                                            Correo electrónico
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-7 col-6">
                                                        <input class="form-control h-50px" value="{{ $user->email }}"
                                                            disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-20">
                                            <div class="col-12">
                                                <h4 class="txt13 titDarkGreyTop text-600 w-100">
                                                    Cambiar contraseña
                                                </h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="row">
                                                    <div class="col-md-5 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">
                                                            Contraseña actual
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-7 col-6">
                                                        <div class="input-group viewPassword">
                                                            <input id="pcurrentpassword" name="currentpassword"
                                                                type="password"
                                                                class="form-control h-50px password_input @error('currentpassword') is-invalid @enderror"
                                                                placeholder="Ingresa tu contraseña actual"
                                                                aria-describedby="basic-addon1" required
                                                                value="{{ old('currentpassword') }}" />
                                                            <span class="input-group-text preview_icon">
                                                                <img src="{{ asset('img/eye-slash.svg') }}"
                                                                    class="eyeIcon" /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">
                                                            Contraseña nueva
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-7 col-6">
                                                        <div class="input-group viewPassword">
                                                            <input id="ppassword" name="password" type="password"
                                                                class="form-control h-50px password_input"
                                                                placeholder="Ingresa tu nueva contraseña"
                                                                aria-describedby="basic-addon1" required
                                                                value="{{ old('password') }}" />
                                                            <span class="input-group-text preview_icon">
                                                                <img src="{{ asset('img/eye-slash.svg') }}"
                                                                    class="eyeIcon" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">
                                                            Repetir contraseña
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-7 col-6">
                                                        <div class="input-group viewPassword">
                                                            <input id="pconfirmpassword" name="confirmpassword"
                                                                type="password" class="form-control h-50px password_input"
                                                                placeholder="Reepetir contraseña nueva"
                                                                aria-describedby="basic-addon1"
                                                                value="{{ old('confirmpassword') }}" required />
                                                            <span class="input-group-text preview_icon">
                                                                <img src="{{ asset('img/eye-slash.svg') }}"
                                                                    class="eyeIcon" />
                                                            </span>
                                                        </div>
                                                        <div class="row mt-5">
                                                            <span id="ppassok" class="text text-danger txt10 ml-5">
                                                                <i class="fa fa-hand-o-up" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    @if (Auth::user()->hasRole('customer'))
                                        <div class="col-md-6 col-12">
                                            <div class="row mt-20">
                                                <div class="col-12">
                                                    <h4 class="txt13 titDarkGreyTop text-600 w-100">
                                                        Notificaciones
                                                    </h4>
                                                    <p>
                                                        Una vez analizado el reporte, recibirás una respuesta
                                                        para que sepas si el insecto que encontraste es o no
                                                        una vinchuca.
                                                    </p>
                                                    <p class="pb-15">
                                                        Elige como quieres recibir la respuesta.
                                                    </p>
                                                </div>
                                            </div>
                                            @php
                                                $notiftel =
                                                    $user->user_notificaciones[0]->activado == 0 ? '' : 'checked';
                                                $notifcel =
                                                    $user->user_notificaciones[1]->activado == 0 ? '' : 'checked';
                                            @endphp
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id="switchemail"
                                                            {{ $notiftel }} />
                                                        <label class="form-check-label pl-10 pt-3"
                                                            for="switchemail">Recibir en mi correo electrónico</label>
                                                    </div>
                                                    <p class="txt12 grey pb-10 pt-5">
                                                        Se enviará un mensaje al correo de tu cuenta
                                                    </p>
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id="switchcel"
                                                            {{ $notifcel }} />
                                                        <label class="form-check-label pl-10 pt-3" for="switchcel">Recibir
                                                            en mi celular</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endif

                                </div>
                                <div class="row pt-20">
                                    <div class="col-md-3 col-6">
                                        <button id="btnSave" type="button" class="btn btn-orange h-50px pt-5 w-100">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                    <div class="col-md-3 col-6">
                                        @if (Auth::user()->hasAnyRole(['administrator', 'manager']))
                                            @php $url="/dashboard" @endphp
                                        @else
                                            @php $url="/index" @endphp
                                        @endif
                                        <a class="btn btn-light-grey h-50px pt-12 pl-20 pr-20"
                                            href="{{ url($url) }}">
                                            Cancelar
                                        </a>
                                    </div>

                                    <div class="pt-20">
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
                                </div>
                            </div>
                        </div>
                        <!--END MAIN -->

                    </form>

                </div>
            </div>
        </div>
    </main>
    <!--FIN MAIN-->

    <!--MODAL CONFIRMACIÓN -->
    <div class="modal fade" tabindex="-1" id="modalconfirm" aria-labelledby="modalconfirm" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-380">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <div class="row">
                        <div class="col-md-12 mx-auto text-center pb-20">
                            <img src="{{ asset('img/question-circle.svg') }}" alt="Enviado OK" />
                            <h5 class="txt18 text-500 espaciado_1 pt-30 mb-20">¿CONFIRMA MODIFICACIÓN DE LOS DATOS DE
                                PERFIL?</h5>
                            <button type="button" class="btn btn-grey h-50px pt-5" data-bs-dismiss="modal"
                                aria-label="Close">Cancelar</button>
                            <button type="submit" class="btn btn-orange h-50px pt-5" form="frmsave"
                                id="btnContinuar">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="w-100 text-center">
        <p class="footerLogin">2024 HorneroApp. Todos los derechos reservados. Desarrollo: <a href="https://avradev.com"
                target="_blank">Avradev.com</a></p>
    </footer>

    <script>
        const PASSWORD = "password";
        const TEXT = "text";

        let passwordIcon = document.querySelectorAll(".preview_icon");
        let passwordField = document.querySelectorAll(".password_input");
        let eyeIcon = document.querySelectorAll(".eyeIcon");

        function togglePass0() {
            if (passwordField[0].type === PASSWORD) {
                passwordField[0].type = TEXT;
                eyeIcon[0].src = "{{ asset('img/eye.svg') }}";
            } else {
                passwordField[0].type = PASSWORD;
                eyeIcon[0].src = "{{ asset('img/eye-slash.svg') }}";
            }
        }

        function togglePass1() {
            if (passwordField[1].type === PASSWORD) {
                passwordField[1].type = TEXT;
                eyeIcon[1].src = "{{ asset('img/eye.svg') }}";
            } else {
                passwordField[1].type = PASSWORD;
                eyeIcon[1].src = "{{ asset('img/eye-slash.svg') }}";
            }
        }

        function togglePass2() {
            if (passwordField[2].type === PASSWORD) {
                passwordField[2].type = TEXT;
                eyeIcon[2].src = "{{ asset('img/eye.svg') }}";
            } else {
                passwordField[2].type = PASSWORD;
                eyeIcon[2].src = "{{ asset('img/eye-slash.svg') }}";
            }
        }

        passwordIcon[0].addEventListener("click", togglePass0);
        passwordIcon[1].addEventListener("click", togglePass1);
        passwordIcon[2].addEventListener("click", togglePass2);

        $(document).ready(function() {

            $('#switchemail').click(function() {
                data = {
                    notificacionid: 1,
                    activado: this.checked
                };
                $.ajax({
                    type: "PUT",
                    url: "{{ URL::to('/account/notification/update') }}",
                    data: data,
                    dataType: "json",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(response) {

                    }
                });
            });

            $('#switchcel').click(function() {
                data = {
                    notificacionid: 2,
                    activado: this.checked
                };
                $.ajax({
                    type: "PUT",
                    url: "{{ URL::to('/account/notification/update') }}",
                    data: data,
                    dataType: "json",
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function(response) {

                    }
                });
            });

            $('#pconfirmpassword').keyup(function() {

                pass = $('#ppassword').val();
                repeat = $('#pconfirmpassword').val();

                if (repeat === pass)
                    $('#ppassok').html('');
                else
                    $('#ppassok').html('Repita la contraseña');

            });

        });

        setTimeout(function() {
            $(".alert").fadeTo(1000, 0).slideUp(1000, function() {
                $(this).remove();
            });
        }, 3000);

        $('#btnSave').click(function() {
            $('#modalconfirm').modal('show');
        })

        if ('{{ $success ?? '' }}' != '') {
            usrname = document.getElementById('pname');
            usrlastname = document.getElementById('plastname');
            $('.btnSesion').html('<span>' + usrname.value.charAt(0).toUpperCase() + usrlastname.value.charAt(0)
            .toUpperCase() + '</span>' + $('#pname').val());
        }
    </script>
@endsection
