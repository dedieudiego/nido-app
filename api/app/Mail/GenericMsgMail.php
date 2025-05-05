<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GenericMsgMail extends Mailable
{
  use Queueable, SerializesModels;

  public $genericmsg;

  public function __construct($genericmsg)
  {
    $this->genericmsg = $genericmsg;
  }

  public function build()
  {
    return $this->from(env('MAIL_FROM_ADDRESS'))
      ->subject('Hornero App')
      ->view('mails.genericmsg')
      ->text('mails.genericmsg_plain');
  }
}
