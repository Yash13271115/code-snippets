# ============================
# Custom PowerShell Profile
# ============================

# ----------------------------
# Laravel Commands
# ----------------------------
Set-Alias art "php artisan"
Set-Alias serve "php artisan serve"
Set-Alias mig "php artisan migrate"
Set-Alias tinker "php artisan tinker"

# ----------------------------
# Git Functions (multi-word commands must be functions)
# ----------------------------
function g { git @args }                               # generic git wrapper
function gs { git status }                              # git status
function ga { git add . }                               # git add all
function gc { param([string]$msg) git commit -m $msg }  # git commit with message
function gcm { param([string]$msg) git commit -m $msg }  # git commit with message
function gp { git push }                                # git push
function gpl { git pull }                               # git pull
function gautosync {
    param(
        [string]$Path = (Get-Location).Path
    )

    # Go to the folder
    Set-Location $Path

    # Pull latest changes
    git pull origin main

    # Stage all changes
    git add .

    # Commit with timestamp (allow empty commits)
    $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto backup at $time" --allow-empty

    # Push changes
    git push origin main

    Write-Host "Auto synced at $time in $Path"
}

# ----------------------------
# Miscellaneous Functions
# ----------------------------
function np { param([string]$file) notepad $file }                     # open file in Notepad
function ll { Get-ChildItem -Force }                                   # list all files including hidden
function cdproj { Set-Location "C:\xampp\htdocs\doctor_detox_crm" }    # go to project folder
function cdsnipwind { Set-Location "C:\Users\ADMIN\AppData\Roaming\Windsurf\User\snippets" } 
function cdsnipcode { Set-Location "C:\Users\ADMIN\AppData\Roaming\Code\User\snippets" } 

# ----------------------------
# Optional: Add more custom functions or aliases below
# Example: PHP version check
function phpver { php -v }

# Example: Clear terminal
function cls { Clear-Host }
