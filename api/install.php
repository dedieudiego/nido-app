<?php

$site_url = 'https://geovin.api.cepave.edu.ar/public/';
//$laravel_dir = __DIR__ . '/path/to/laravel';
$laravel_dir = __DIR__;

require $laravel_dir . '/bootstrap/autoload.php';

$app = require_once $laravel_dir . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

echo 'Installing...<br>';
$kernel->call('migrate', ['--force' => true]);

echo 'Seeding...<br>';
$kernel->call('db:seed', ['--force' => true]);

// redirect
echo "<script>window.location = '$site_url'</script>";