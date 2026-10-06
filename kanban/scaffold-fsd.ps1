# Creates the Feature-Sliced Design folder skeleton inside src.
# Run it from the project root (the folder with package.json).
# Safe to run again: existing files are never overwritten.

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath 'package.json')) {
    Write-Error 'package.json not found. Run this script from the project root (the kanban folder).'
}

$src = Join-Path (Get-Location) 'src'
if (-not (Test-Path -LiteralPath $src)) {
    Write-Error 'The src folder was not found.'
}

# Slices: each one gets a public API file, index.ts
$slices = @(
    'pages/board',
    'widgets/board',
    'features/move-card',
    'features/card-form',
    'entities/board',
    'entities/column',
    'entities/card'
)

# Other folders: segments and layers without slices
$folders = @(
    'app',
    'entities/board/model',
    'shared/ui',
    'shared/lib',
    'shared/config'
)

function New-Dir([string]$path) {
    if (-not (Test-Path -LiteralPath $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
        Write-Host "  created folder  $path"
    }
}

function New-FileIfMissing([string]$path, [string]$content) {
    if (-not (Test-Path -LiteralPath $path)) {
        [System.IO.File]::WriteAllText($path, $content)
        Write-Host "  created file    $path"
    }
}

Write-Host 'Slices:'
foreach ($slice in $slices) {
    $dir = Join-Path $src $slice
    New-Dir $dir
    New-FileIfMissing (Join-Path $dir 'index.ts') "export {}`n"
}

Write-Host 'Other folders:'
foreach ($folder in $folders) {
    $dir = Join-Path $src $folder
    New-Dir $dir
    # .gitkeep makes git keep an empty folder
    if (-not (Get-ChildItem -LiteralPath $dir -Force)) {
        New-FileIfMissing (Join-Path $dir '.gitkeep') ''
    }
}

Write-Host ''
Write-Host 'Done. Check the result with: tree src /F'
