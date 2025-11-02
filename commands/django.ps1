# ----------------------------
# Django Commands
# ----------------------------
function djangocreate { 
    param([string]$name = "myapp")

    mkdir $name
    Set-Location $name

    python -m django startproject mysite .
}

function djangorun { 
    param([int]$port = 8000)

    py manage.py runserver 127.0.0.1:$port
}
