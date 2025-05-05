<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PassRecoverMail extends Mailable
{
  use Queueable, SerializesModels;

  public $passemail;

  public function __construct($passemail)
  {
    $this->passemail = $passemail;
  }

  public function build()
  {
    return $this->from(env('MAIL_FROM_ADDRESS'))
      ->subject('Hornero App - Recupero de contraseña')
      ->view('mails.passrecover')
      ->text('mails.passrecover_plain');
  }
}
