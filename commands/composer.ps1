# ----------------------------
# Composer Commands
# ----------------------------
function compi { composer install }
function compup { composer update }

function compcrlr { param([string]$name) composer create-project laravel/laravel @name }
# ----------------------------
# Composer Inertiajs Commands
# ----------------------------
function compinrjs { composer require inertiajs/inertia-laravel }

