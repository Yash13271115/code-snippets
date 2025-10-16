<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Terminal Snippets Setup</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; color: #333; padding: 20px;">

    <h1 style="color: #2c3e50; border-bottom: 2px solid #2c3e50; padding-bottom: 5px;">Terminal Snippets Setup</h1>

    <p style="margin-bottom: 15px;">
        Follow these steps to create and configure terminal snippets in VS Code and PowerShell.
    </p>

    <h2 style="color: #16a085; margin-top: 20px;">1. Open Snippets Configuration</h2>
    <p style="margin-bottom: 10px;">
        Go to VS Code <strong>Preferences → Configure Snippets</strong> to create a new snippet file.
    </p>

    <h2 style="color: #16a085; margin-top: 20px;">2. Create Snippet File</h2>
    <p style="margin-bottom: 10px;">
        Create a configuration file for terminal snippets at the following location:
    </p>
    <pre style="background-color: #ecf0f1; padding: 10px; border-radius: 5px; overflow-x: auto;">
C:\Users\ADMIN\AppData\Roaming\Code\User\snippets\terminal_snippet.ps1.ps1
    </pre>
    <p style="margin-bottom: 10px;">
        You can also run the snippet file using the command:
    </p>
    <pre style="background-color: #ecf0f1; padding: 10px; border-radius: 5px; overflow-x: auto;">
terminal_snippet.ps1.ps1 "Create config"
    </pre>

    <h2 style="color: #16a085; margin-top: 20px;">3. Open PowerShell Profile</h2>
    <p style="margin-bottom: 10px;">
        Open your PowerShell profile in Notepad:
    </p>
    <pre style="background-color: #ecf0f1; padding: 10px; border-radius: 5px; overflow-x: auto;">
notepad $PROFILE
    </pre>

    <h2 style="color: #16a085; margin-top: 20px;">4. Add Snippets to Profile</h2>
    <p style="margin-bottom: 10px;">
        Add this line at the top of your profile to load your terminal snippets:
    </p>
    <pre style="background-color: #ecf0f1; padding: 10px; border-radius: 5px; overflow-x: auto;">
. "C:\Users\ADMIN\AppData\Roaming\Code\User\snippets\terminal_snippet.ps1.ps1"
    </pre>
    <p style="margin-bottom: 10px;">
        Save the profile file and reload it using:
    </p>
    <pre style="background-color: #ecf0f1; padding: 10px; border-radius: 5px; overflow-x: auto;">
. $PROFILE
    </pre>

    <h2 style="color: #16a085; margin-top: 20px;">5. Done!</h2>
    <p>
        Your terminal snippets are now configured and ready to use in PowerShell.
    </p>

</body>
</html>
