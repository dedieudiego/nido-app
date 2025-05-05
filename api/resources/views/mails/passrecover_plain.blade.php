Hola {{ $passemail->nombreUsuario }} !
Recibimos un pedido de recupero de contraseña.
Hacé clic en el siguiente link o copialo y pegalo en tu navegador de preferencia para recuperar tu contraseña.

    {{ $passemail->linkRecover }}

Si no pediste recuperar tu contraseña, ignorá este correo o ponete en contacto con nosotros.
Gracias!

{{ $passemail->sender }}
