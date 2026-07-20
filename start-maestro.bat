@echo off
echo ========================================================
echo INICIANDO O ECOSSISTEMA MAESTRO VIA PM2 (BARE METAL)
echo ========================================================
echo.

echo Instalando/Atualizando PM2 globalmente...
call npm install -g pm2

echo.
echo Iniciando Servicos Node (Backend, Frontend, Agents)...
call pm2 start ecosystem.config.js

echo.
echo Salvando estado do PM2...
call pm2 save

echo.
echo ========================================================
echo OS SERVIDORES ESTAO RODANDO NATIVAMENTE! 
echo Acesse: http://localhost:3000/admin/analytics
echo Para monitoramento digite: pm2 monit
echo ========================================================
echo Pressione qualquer tecla para ver os logs em tempo real...
pause >nul
pm2 logs
