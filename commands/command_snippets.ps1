# ============================
# Custom PowerShell Profile
# ============================
# This profile script loads various command snippets and defines custom functions for enhanced productivity.
# ----------------------------
# Miscellaneous Functions
# ----------------------------
function np { param([string]$file) notepad $file } # open file in Notepad
function ll { Get-ChildItem -Force } # list all files including hidden
function cdsnipwind { 
    $UserPath = "C:\Users\$env:USERNAME\AppData\Roaming\Windsurf\User\snippets"
    Set-Location $UserPath 
}
function cdsnipcode { 
    $UserPath = "C:\Users\$env:USERNAME\AppData\Roaming\Code\User\snippets"
    Set-Location $UserPath 
}

function snipmerge {
    python ./merge/merge_snippets.py
}

function crfile {
    param([string]$name = "NewFile.txt")
    New-Item -Path (Join-Path $PWD $name) -ItemType File
}

function crpathFile {
    param([string]$path)
    New-Item -Path (Join-Path $PWD $path) -ItemType File
}

function crfolder {
    param([string]$name = "NewFile.txt")
    New-Item -Path (Join-Path $PWD $name) -ItemType Directory
}

function crpathFolder {
    param([string]$path)
    New-Item -Path (Join-Path $PWD $path) -ItemType Directory
}

# ----------------------------
# Django Commands
# ----------------------------
. "$PSScriptRoot\django.ps1"

# ----------------------------
# Composer Commands
# ----------------------------
. "$PSScriptRoot\composer.ps1"

# ----------------------------
# NPM Commands
# ----------------------------
. "$PSScriptRoot\npm.ps1"

# ----------------------------
# schadcn Commands
# ----------------------------
. "$PSScriptRoot\schadcn.ps1"

# ----------------------------
# Laravel Commands
# ----------------------------
. "$PSScriptRoot\artisan.ps1"

# ----------------------------
# Git Commands 
# ----------------------------
. "$PSScriptRoot\git.ps1"