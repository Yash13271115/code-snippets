# ----------------------------
# Composer Commands
# ----------------------------
function composer_install { 
    # title "Composer Install"
    # description "Run composer install to install all dependencies."
    composer install 
}

function composer_update { 
    # title "Composer Update"
    # description "Run composer update to update project dependencies."
    composer update 
}

function composer_create_laravel {
    # title "Create Laravel Project"
    # description "Create a new Laravel project using composer create-project."
    param([string]$name = "my-app")
    composer create-project laravel/laravel $name
}

# ----------------------------
# Composer Inertia.js Commands
# ----------------------------
function composer_inertia_require { 
    # title "Install Inertia.js Laravel Adapter"
    # description "Install the Inertia Laravel server-side adapter."
    composer require inertiajs/inertia-laravel 
}