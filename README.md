
<h1>For Creating New Configure Snippets:</h1>
<p>"Preferences: Configure Snippets" (ctrl+shift+p)</p>

Create config for terminal snippits on specific location
1. C:\Users\ADMIN\AppData\Roaming\Code\User\snippets\terminal_snippet.ps1
2. Run this in PowerShell:
"Test-Path $PROFILE"
3. If it returns False, create one:
"New-Item -Path $PROFILE -ItemType File -Force"
4. terminal_snippet.ps1 "Create config"
5. notepad $PROFILE
6. . "C:\Users\$env:USERNAME\AppData\Roaming\Code\User\snippets\terminal_snippet.ps1" -> "Add the line on top"
. "C:\Users\$env:USERNAME\AppData\Roaming\Windsurf\User\snippets\terminal_snippet.ps1"
7. $PROFILE -> "Save terminal command save"