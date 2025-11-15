# ----------------------------
# Git Commands
# ----------------------------

function git_status { 
    # title "Git Status"
    # description "Show the working directory status."
    git status 
}

function git_add_all { 
    # title "Git Add All"
    # description "Stage all changed files for commit."
    git add . 
}

function git_commit { 
    # title "Git Commit"
    # description "Commit staged changes with a message."

    param([string]$msg)
    git commit -m $msg
}

function git_push { 
    # title "Git Push"
    # description "Push committed changes to the remote repository."
    git push 
}

function git_pull { 
    # title "Git Pull"
    # description "Pull latest changes from the specified branch."

    param([string]$branch = "origin main")
    git pull $branch 
}

function git_auto_sync {
    # title "Git Auto Sync"
    # description "Automatically pull, add, commit, and push changes with a timestamp message."

    param(
        [string]$Path = (Get-Location).Path
    )

    # Navigate to project directory
    Set-Location $Path

    # Pull latest changes
    git pull origin main

    # Add all files
    git add .

    # Commit with timestamp
    $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto backup at $time" --allow-empty

    # Push to remote
    git push origin main

    Write-Host "Auto synced at $time in $Path"
}