@echo off
echo ========================================================
echo INICIANDO O ECOSSISTEMA MAESTRO (Frontend + Backend)
echo ========================================================

echo.
echo [1] Iniciando o Maestro Backend (Porta 3001) em segundo plano...
start "Maestro Backend" cmd /c "cd maestro-backend && npm run start:dev"

echo.
echo [2] Iniciando o Maestro Frontend (Porta 3000) em segundo plano...
start "Maestro Frontend" cmd /c "cd maestro-frontend && npm run dev"

echo.
echo ========================================================
echo OS SERVIDORES ESTAO RODANDO! 
echo Acesse: http://localhost:3000/admin/analytics
echo ========================================================
pause
