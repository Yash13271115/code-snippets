
<h1>For Creating New Configure Snippets:</h1>
<p>"Preferences: Configure Snippets" (ctrl+shift+p)</p>

Create config for terminal snippits on specific location
1. C:\Users\ADMIN\AppData\Roaming\Code\User\snippets\terminal_snippet.ps1
2. Run this in PowerShell:
"Test-Path $PROFILE"
3. If it returns False, create one:
"New-Item -Path $PROFILE -ItemType File -Force"
4. notepad $PROFILE
5. terminal_snippet.ps1 "Create config"
6. . "C:\Users\$env:USERNAME\AppData\Roaming\Code\User\snippets\terminal_snippet.ps1" -> "Add the line on top"
. "C:\Users\$env:USERNAME\AppData\Roaming\Windsurf\User\snippets\terminal_snippet.ps1"
7. Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
"if not access given"
8. $PROFILE -> "Save terminal command save"