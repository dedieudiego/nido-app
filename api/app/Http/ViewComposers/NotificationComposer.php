<?php

namespace App\Http\ViewComposers;

use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\NotificacionPull;

class NotificationComposer {

    use SoftDeletes;

    protected $myNotifications;

    public function compose(View $view)
    {
        $myNotifications = NotificacionPull::where('userid',Auth::user()->id)->get();
        $view->with('myNotifications', $myNotifications);
    }

}
