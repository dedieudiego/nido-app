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
                                    <p class="pt-10 mb-0 txt20">EDITAR USUARIO</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--END FILTERS-->

                    <form action="{{ route('accounts.update') }}" method="post" enctype="multipart/form-data"
                        class="needs-validation" id="frmsave" novalidate>
                        @csrf
                        <div class="row pb-50">
                            <div class="col-md-8 col-12">
                                <div class="row">
                                    <div class="col-md-6 col-12">
                                        <div class="row mt-20">
                                            <div class="col-12">
                                                <h4 class="txt13 titDarkGreyTop text-600 w-100">Datos del usuario</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <input type="hidden" value="{{ $user->id }}" name="id" />
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Nombre</h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <input id="pname" name="name"
                                                            class="form-control h-50px @error('name') is-invalid @enderror"
                                                            value="{{ $user->name ?? old('name') }}" required />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Apellido</h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <input id="plastname" name="lastname"
                                                            class="form-control h-50px @error('lastname') is-invalid @enderror"
                                                            value="{{ $user->lastname ?? old('lastname') }}" required />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Teléfono</h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <input name="phone"
                                                            class="form-control h-50px @error('phone') is-invalid @enderror"
                                                            value="{{ $user->phone ?? old('phone') }}" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Correo electrónico</h5>
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
                                                <h4 class="txt13 titDarkGreyTop text-600 w-100">Cambiar contraseña (si no se
                                                    desea modificar, dejar en blanco)</h4>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-12">
                                                <div class="row">
                                                    <div class="col-md-5 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Contraseña nueva</h5>
                                                    </div>
                                                    <div class="col-md-7 col-6">
                                                        <div class="input-group viewPassword">
                                                            <input id="ppassword" name="password" type="password"
                                                                class="form-control h-50px password_input"
                                                                placeholder="Ingresa tu nueva contraseña"
                                                                aria-describedby="basic-addon1" required value="" />
                                                            <span class="input-group-text preview_icon">
                                                                <img src="{{ asset('img/eye-slash.svg') }}"
                                                                    class="eyeIcon" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-5 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Repetir contraseña</h5>
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

                                    <!-- SEGUNDA COLUMNA -->
                                    <div class="col-md-6 col-12">
                                        <div class="row mt-20">
                                            <div class="col-12">
                                                <h4 class="txt13 titDarkGreyTop text-600 w-100">Perfil del usuario</h4>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <input type="hidden" value="{{ $user->id }}" name="id" />
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Rol</h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <select class="form-select h-50px"
                                                            aria-label="Default select example" id="roleId"
                                                            name="roleId">
                                                            <option value=""></option>
                                                            @foreach ($roles as $role)
                                                                <option value="{{ $role->id }}"
                                                                    {{ $role->id == $user->roles[0]->id ? 'selected' : '' }}>
                                                                    {{ Str::upper($role->name) }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4 col-6">
                                                        <h5 class="txt13 titWhite text-600 w-100">Provincia asociada</h5>
                                                    </div>
                                                    <div class="col-md-8 col-6">
                                                        <select class="form-select h-50px"
                                                            aria-label="Default select example" id="provId"
                                                            name="provId">
                                                            <option value=""></option>
                                                            @foreach ($provincias as $prov)
                                                                <option value="{{ $prov->id }}"
                                                                    {{ $prov->id == $user->provincia_id ? 'selected' : '' }}>
                                                                    {{ $prov->nombre }}
                                                                </option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <!-- END SEGUNDA COLUMNA -->
                                </div>

                                <div class="row pt-20">
                                    <div class="col-md-3 col-6">
                                        <button id="btnSave" type="button" class="btn btn-orange h-50px pt-5 w-100">
                                            Guardar Cambios
                                        </button>
                                    </div>

                                    <div class="col-md-3 col-6">
                                        <a class="btn btn-light-grey h-50px pt-12 pl-20 pr-20"
                                            href="{{ route('accounts.index') }}">
                                            Cancelar
                                        </a>
                                    </div>

                                    <div class="pt-20">
                                        @if ($errors->any())
                                            <div class="alert alert-danger" role="alert">
                                                {{ $errors->first() }}
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

        passwordIcon[0].addEventListener("click", togglePass0);
        passwordIcon[1].addEventListener("click", togglePass1);

        $(document).ready(function() {
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

        $('.nav-link').each(function(index, element) {
            $(this).removeClass('active');
        });

        $('#mnuUsers').addClass('active');
    </script>
@endsection
