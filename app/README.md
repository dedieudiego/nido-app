# INSTRUCCIONES DE INSTALACIÓN

### Instalar Expo Cli

Instalar en forma global expo con el siguiente comando:

```bash
npm install -g expo-cli
```

Si trabajás sobre MAC, se recomienda además [instalar Watchman](https://facebook.github.io/watchman/docs/install/#buildinstall). Si sos Win, NO es necesario que lo instales.

### Loguearse a Expo

Una vez instalado, loguearse a Expo. Si no tenés cuenta, [creátela en forma gratuita](https://expo.io/signup)

```bash
expo login
```

### Instalar los componentes

Hay que correr un comando para que se instalen los componentes necesario

```bash
npm install
```

### Hot Reload

Instalarse la app de Expo en el celular [usando Android](https://play.google.com/store/apps/details?id=host.exp.exponent) o [usando iOS](https://search.itunes.apple.com/WebObjects/MZContentLink.woa/wa/link?path=apps%2fexponent), que es lo que se usará para ir probando en tiempo real nuestro código.

### Iniciar proyecto

Si el proyecto fuera de cero, se corre el comando "expo init", pero en este caso como ya existe, directamente corremos el siguiente comando y podemos seguir las instrucciones en pantalla para verlo reflejado en nuestro celular (básicamente, abrir la app de Expo en el cel y escanear el QR).

```bash
npm start
```

### Para hacer un apk

```bash
eas build --profile preview --platform android
```
