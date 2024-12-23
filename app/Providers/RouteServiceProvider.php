<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        parent::register();
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        parent::boot();
    }

    public function map()
    {
        $this->mapApiRoutes();  

        $this->mapWebRoutes();
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    protected function mapWebRoutes()
    {
        Route::group(['middleware' => 'web'], function() {
            require base_path('routes/web.php');
        });
    }
}
