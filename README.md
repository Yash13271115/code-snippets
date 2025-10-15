For Configure Snippets -> Preferences: Configure Snippets

# auto-push.ps1
$path = "C:\Users\ADMIN\AppData\Roaming\Windsurf\User\snippets"
cd $path

while ($true) {
    git add .
    $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto backup at $time" --allow-empty
    git push origin main
    Start-Sleep -Seconds 120  # runs every 2 minutes
}

Run:
powershell -ExecutionPolicy Bypass -File .\auto-push.ps1