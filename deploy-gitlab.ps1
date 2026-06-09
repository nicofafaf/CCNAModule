# Einmal ausfuehren: Quiz auf GitLab deployen
# Du brauchst nur ein GitLab Access Token (siehe README unten)

param(
    [Parameter(Mandatory = $true)]
    [string]$Token
)

$ErrorActionPreference = "Stop"
$repo = "https://oauth2:$Token@gitlab.com/nicofafaf/CCNAModulenico.git"

Write-Host "Pushe Quiz nach GitLab..." -ForegroundColor Cyan
git remote remove gitlab 2>$null
git remote add gitlab $repo
git push -u gitlab main

Write-Host ""
Write-Host "Fertig! Warte 1-2 Minuten, dann oeffne:" -ForegroundColor Green
Write-Host "https://nicofafaf.gitlab.io/CCNAModulenico/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pipeline pruefen: https://gitlab.com/nicofafaf/CCNAModulenico/-/pipelines" -ForegroundColor Gray
