# ============================
# Custom PowerShell Profile
# ============================
# This profile script loads various command snippets and defines custom functions for enhanced productivity.


# ----------------------------
# Miscellaneous Functions
# ----------------------------

function windows_open_notepad { 
    # title "Open in Notepad"
    # description "Open a given file using Notepad."
    param([string]$file)
    notepad $file 
}

function windows_list_files_all { 
    # title "List Files (All)"
    # description "List all files including hidden ones in the current directory."
    Get-ChildItem -Force 
}

function windows_cd_snip_windsurf { 
    # title "Go to Windsurf Snippets Folder"
    # description "Navigate to Windsurf snippet directory."
    $UserPath = "C:\Users\$env:USERNAME\AppData\Roaming\Windsurf\User\snippets"
    Set-Location $UserPath 
}

function windows_cd_snip_code { 
    # title "Go to VS Code Snippets Folder"
    # description "Navigate to VS Code snippet directory."
    $UserPath = "C:\Users\$env:USERNAME\AppData\Roaming\Code\User\snippets"
    Set-Location $UserPath 
}

function windows_snippet_merge {
    # title "Merge Snippets"
    # description "Run the Python script that merges all snippet JSON files."
    python ./merge/merge_snippets.py
}

function windows_create_file {
    # title "Create File"
    # description "Create a new file in the current directory."
    param([string]$name = "NewFile.txt")
    New-Item -Path (Join-Path $PWD $name) -ItemType File
}

function windows_create_file_path {
    # title "Create File at Path"
    # description "Create a new file using the provided relative path."
    param([string]$path)
    New-Item -Path (Join-Path $PWD $path) -ItemType File
}

function windows_create_folder {
    # title "Create Folder"
    # description "Create a new directory in the current path."
    param([string]$name = "NewFolder")
    New-Item -Path (Join-Path $PWD $name) -ItemType Directory
}

function windows_create_folder_path {
    # title "Create Folder at Path"
    # description "Create a new folder using the provided relative path."
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
# Shadcn Commands
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
