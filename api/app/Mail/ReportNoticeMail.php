<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReportNoticeMail extends Mailable
{
  use Queueable, SerializesModels;

  public $form;

  public function __construct($form)
  {
    $this->form = $form;
  }

  public function build()
  {
    return $this->from(env('MAIL_FROM_ADDRESS'))
      ->subject('Hornero App - AVISO DE REPORTE')
      ->view('mails.aviso_reporte');
  }
}
