# ============================
# Custom PowerShell Profile
# ============================
# This profile script loads various command snippets and defines custom functions for enhanced productivity.
# ----------------------------
# Composer Commands
# ----------------------------
. "$PSScriptRoot\schadcn.ps1"

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
# Git Functions (multi-word commands must be functions)
# ----------------------------
. "$PSScriptRoot\git.ps1"

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
