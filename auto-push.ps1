# auto-push.ps1
$path = "C:\Users\ADMIN\AppData\Roaming\Windsurf\User\snippets"
Set-Location $path

while ($true) {

    # Pull latest changes to avoid conflicts
    git pull origin main

    # Stage all changes
    git add .

    # Commit with timestamp (allow empty commits)
    $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto backup at $time" --allow-empty

    # Push changes
    git push origin main

    # Wait 10 minutes before repeating
    Start-Sleep -Seconds 600
}
