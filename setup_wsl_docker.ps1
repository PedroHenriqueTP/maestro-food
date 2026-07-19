# Script de Instalação Automatizada: WSL 2 + Docker Desktop
# Requer permissão de Administrador (O script solicitará automaticamente)

# 1. Elevação Automática de Privilégios (UAC)
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Solicitando privilégios de Administrador..."
    Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

Write-Host "======================================================"
Write-Host "    MAESTRO OS: SETUP DA INFRAESTRUTURA DOCKER        "
Write-Host "======================================================"
Write-Host " "

# 2. Habilitar Virtual Machine Platform e WSL
Write-Host "[1/4] Habilitando Plataforma de Máquina Virtual e Subsistema Linux (WSL)..."
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

Write-Host "[2/4] Atualizando o Kernel do WSL..."
wsl --update

Write-Host "[3/4] Baixando o Docker Desktop..."
$InstallerPath = "$env:USERPROFILE\Downloads\DockerDesktopInstaller.exe"
Invoke-WebRequest -Uri "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe" -OutFile $InstallerPath

Write-Host "[4/4] Instalando o Docker Desktop (Instalação Silenciosa)..."
# Inicia a instalação silenciosa do Docker aceitando os termos
Start-Process -FilePath $InstallerPath -ArgumentList "install --quiet --accept-license" -Wait

Write-Host " "
Write-Host "======================================================"
Write-Host "SETUP CONCLUÍDO COM SUCESSO!"
Write-Host "O computador PRECISA ser reiniciado para que o Hyper-V e o WSL entrem em vigor."
Write-Host "Após reiniciar, o Docker Desktop será iniciado automaticamente."
Write-Host "======================================================"
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
