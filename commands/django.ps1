# ----------------------------
# Django Commands
# ----------------------------
function djCreate { 
    param([string]$dir = "project", [string]$name = "myapp")

    mkdir $dir
    Set-Location $dir

    python -m django startproject $name .
}

function djServe { 
    param([int]$port = 8000)

    py manage.py runserver 127.0.0.1:$port
}

function djMigrate { 
    py manage.py migrate
}

function djMakemigrations {
    param([string]$app = "")
    py manage.py makemigrations $app
}

function djStartApp {
    param([string]$app)
    py manage.py startapp $app
}

function djMigrateApp {
    param([string]$app)

    py manage.py migrate $app
}

function djShowMigrations {
    py manage.py showmigrations
}

function djCrSpUser { 
    python manage.py createsuperuser
}
