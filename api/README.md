---
## INSTRUCCIONES DE INSTALACIÓN:

1. composer install >> INSTALA TODOS LOS COMPONENTES DE VENDOR.
2. Configurar BD en .env. >> CAMPOS DB_DATABASE, DB_USERNAME Y DB_PASSWORD
3. php artisan migrate:fresh --seed >> CREA EL MODELO EN LA BASE Y LOS SEEDS CON DATOS
4. php artisan jwt:secret >> GENERA LA CLAVE DEL JWT NECESARIA
5. php artisan serve >> LET THE GAME BEGIN! [https://www.youtube.com/watch?v=m8jeO85yJXk]
6. Configurar datos SMTP en .env >> TODOS LOS CAMPOS MAIL\_\*
7. agregar a .env para login con redes sociales >>
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT=
8. agregar a .env la casilla de recepción de mails >> MAIL_TO=recepcion@ejemplo.com
10. agregar a .env UTC para determinar fecha/hora del servidor.
---

## Happy Coding !

php artisan serve --host 0.0.0.0:8000
en Config.js recordar poner la IP propia en dev

---
