# ----------------------------
# Django Commands
# ----------------------------
function django_create_project { 
    # title "Create Django Project"
    # description "Create a new Django project in a folder with a specified name."
    param([string]$dir = "project", [string]$name = "myapp")

    mkdir $dir
    Set-Location $dir

    python -m django startproject $name .
}

function django_serve { 
    # title "Run Django Development Server"
    # description "Start the Django development server on a specific port."
    param([int]$port = 8000)
    py manage.py runserver 127.0.0.1:$port
}

function django_migrate { 
    # title "Run Migrations"
    # description "Apply all pending Django migrations."
    py manage.py migrate
}

function django_make_migrations {
    # title "Make Migrations"
    # description "Create new migration files for a specific app."
    param([string]$app = "")
    py manage.py makemigrations $app
}

function django_start_app {
    # title "Start Django App"
    # description "Create a new Django app with the given name."
    param([string]$app)
    py manage.py startapp $app
}

function django_migrate_app {
    # title "Migrate Specific App"
    # description "Apply migrations for a specific Django app."
    param([string]$app)
    py manage.py migrate $app
}

function django_show_migrations {
    # title "Show Migrations"
    # description "Display all migrations and their statuses."
    py manage.py showmigrations
}

function django_create_superuser { 
    # title "Create Superuser"
    # description "Create an administrative Django superuser."
    python manage.py createsuperuser
}
