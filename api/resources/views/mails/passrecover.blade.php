<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Contacto</title>

    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Rubik:300,400,700');



        body {
            font-family: 'Rubik', Arial, sans-serif;
            color: #4f4f4f;
        }

        .spacer20 {
            height: 20px;
        }

        .spacer40 {
            height: 40px;
        }

        .boton-verde-big {
            font-size: 18px;
            font-family: Helvetica, Arial, sans-serif;
            color: #ffffff;
            text-decoration: none;
            border-radius: 9px;
            -webkit-border-radius: 9px;
            -moz-border-radius: 9px;
            background-color: #84cd4f;
            border-top: 15px solid #84cd4f;
            border-bottom: 15px solid #84cd4f;
            border-right: 70px solid #84cd4f;
            border-left: 70px solid #84cd4f;
            display: inline-block;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase
        }

        .boton-verde-big:hover {
            background-color: #66a738;
            border-top: 15px solid #66a738;
            border-bottom: 15px solid #66a738;
            border-right: 70px solid #66a738;
            border-left: 70px solid #66a738;
        }


        .bold {
            font-weight: bold
        }

        /*---FONT SIZE--*/
        .font12 {
            font-size: 12px
        }

        .font14 {
            font-size: 14px;
            line-height: 22px
        }

        .font16 {
            font-size: 16px
        }

        /*---PADDINGS--*/
        .padding-clear {
            padding: 0
        }

        .margin-clear {
            margin: 0
        }


        .p15 {
            padding: 15px;
        }

        .p20 {
            padding: 20px;
        }

        .pr5 {
            padding-right: 5px;
        }

        .pt10 {
            padding-top: 10px;
        }

        .pt0 {
            padding-top: 0px;
        }

        .pb10 {
            padding-bottom: 10px;
        }

        .pb15 {
            padding-bottom: 15px;
        }

        /*--BACKGROUNDS--*/
        .bg-verde {
            background-color: #84cd4f;
        }

        .bg-blanco {
            background-color: #FFF;
        }

        .bg-gris {
            background-color: #f5f5f5;
        }

        .bg-gris-oscuro {
            background-color: #FEA428;
        }
/*--BACKGROUNDS--*/
.bg-verde {background-color:#84cd4f; }
.bg-blanco {background-color:#FFF; }
.bg-gris {background-color: #f5f5f5; }
.bg-gris-oscuro {background-color:#00D7A2; }

        /*--BORDERS--*/
        .border-verde {
            border: solid 2px #84cd4f;
        }

        /*--COLORS--*/
        .celeste {
            color: #8ccbcb;
        }

        .white {
            color: #fff;
        }

        .grey {
            color: #989898;
        }

        /*--LINKS--*/
        .link-gris {
            color: #979797;
            text-decoration: none;
        }

        .link-gris:hover {
            color: #666363;
            text-decoration: none;
        }

        .link-gris:active {
            color: #979797;
            text-decoration: none;
        }


.link-gris-oscuro {color: #00D7A2; text-decoration: none;}
.link-gris-oscuro:hover {color: #838383; text-decoration: none;}
.link-gris-oscuro:active {color: #4f4f4f; text-decoration: none;}
</style>

    <!--[if mso]>
<style type=”text/css”>
.fallback-text {
font-family: Arial, sans-serif;
}
</style>
<![endif]-->

</head>

<body class="bg-gris">

    <!-- TABLA PRINCIPAL -->
    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" class="fallback-text bg-gris p20">
        <tbody>
            <tr>
                <td valign="top" align="center">
                    <!-- INICIA CONTENIDO -->
                    <table width="600px" border="0" cellspacing="0" cellpadding="0" class="bg-blanco">
                        <tbody>
                            <!-- HEADER-->
                            <tr class="bg-gris-oscuro">
                                <td class=" p15 white">HorneroApp</td>
                            </tr>
                            <!-- FIN HEADER -->

                            <!-- INICIO CONTENIDO-->
                            <tr>
                                <td class="p20">

						<P class="font14">AVISO</P>
						<P class="font14 pt10">Recupero de Clave de Acceso:</P>
						<div>
							<a href="{{ $passemail->linkRecover }}">{{ $passemail->linkRecover }}</a>
						</div>
				  </td>
				</tr>
				<tr>
				  <td class="p20 pt0">

						<table width="100%" border="0" cellspacing="0" cellpadding="0">
						  <tbody>
							<tr>
                                Hola <i>{{ $passemail->nombreUsuario }} !</i>
                                <p>Recibimos un pedido de recupero de contraseña.</p>
                                <p>Hacé clic en el siguiente link o copialo y pegalo en tu navegador de preferencia para recuperar tu contraseña.</p>

                                <p>Si no pediste recuperar tu contraseña, ignorá este correo o ponete en contacto con nosotros.</p>
                                <p>Gracias!</p>

                                <br/>
                                <i>{{ $passemail->sender }}</i>
							</tr>
							<tr class="spacer20"></tr>
						  </tbody>
						</table>
				  </td>
				</tr>

                            <tr>
                                <td class="p20">
                                    <P class="font14 pt10">Saludos!</P>
                                </td>
                            </tr>
                            <!-- FIN CONTENIDO-->

                            <!-- BOTTOM-->
                            <tr class="bg-gris-oscuro">
                                <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="center">
                                                    <p class="white font14">© 2024 HorneroApp</p>
                                                </td>
                                            </tr>
                                            <tr class="spacer20"></tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- FIN CONTENIDO -->
                </td>
            </tr>
        </tbody>
    </table>
    <!-- FIN TABLA PRINCIPAL -->
</body>

</html>
