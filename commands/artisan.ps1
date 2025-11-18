# ----------------------------
# Laravel Commands
# ----------------------------
function laravel_artisan { 
    # title "Laravel Artisan Command"
    # description "Run a Laravel Artisan command with arguments."
    php artisan @args 
}
function laravel_serve { 
    # title "Laravel Artisan Command"
    # description "Run a Laravel Artisan command with arguments."
    php artisan serve @args 
}

function laravel_controller { 
    # title "Laravel Artisan Command"
    # description "Run a Laravel Artisan command with arguments."
    param([string]$name = "MyController") 
    php artisan make:controller $name 
}

function laravel_request { 
    # title "Laravel Artisan Command"
    # description "Run a Laravel Artisan command with arguments."
    param([string]$name = "MyRequest") 
    php artisan make:request $name 
}

function laravel_serve_port { 
    # title "Laravel Artisan Command"
    # description "Run a Laravel Artisan command with arguments."
    param([int]$port = 8080)  
    php artisan serve --port=$port 
}
function laravel_inertia_middleware { 
    # title "Laravel Inertia Middleware"
    # description "Create Inertia middleware for Laravel."
    php artisan inertia:middleware 
}