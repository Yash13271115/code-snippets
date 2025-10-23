# ----------------------------
# Laravel Commands
# ----------------------------
function lrart { php artisan @args }
function lrserve { php artisan serve @args }
function lrservep { param([int]$port = 8080)  php artisan serve --port=$port }
function lrinrmid { php artisan inertia:middleware }