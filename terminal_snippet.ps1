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
function gt { git @args } # generic git wrapper
function gts { git status } # git status
function gta { git add . } # git add all
function gtc { param([string]$msg) git commit -m $msg }
function gtp { git push } # git push
function gtpl { 
    param([string]$branch = "origin main") 
    git pull $branch 
}
function gtautosync {
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
# ----------------------------
# Optional: Add more custom functions or aliases below
# Example: PHP version check
function phpver { php -v }
# Example: Clear terminal
function cls { Clear-Host }