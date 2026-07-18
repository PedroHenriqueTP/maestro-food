@echo off
echo =======================================================
echo          PROJETO MAESTRO - BUILD SCRIPT
echo =======================================================
echo.

echo [1/4] Preparando Backend (NestJS)...
cd maestro-backend
call npm install
echo [1/4] Gerando Prisma Client...
call npx prisma generate
echo [1/4] Compilando Backend...
call npm run build
cd ..
echo [OK] Backend Pronto!
echo.

echo [2/4] Preparando Frontend (Next.js)...
cd maestro-frontend
call npm install
echo [2/4] Compilando Frontend (Zero-Dependency UI)...
call npm run build
cd ..
echo [OK] Frontend Pronto!
echo.

echo =======================================================
echo [3/4] BUILD CONCLUIDO COM SUCESSO! 100%% MVP
echo =======================================================
echo.
echo Para rodar a infraestrutura completa:
echo 1. Inicie o banco: docker-compose up -d
echo 2. Backend: cd maestro-backend ^&^& npm run start:prod
echo 3. Frontend: cd maestro-frontend ^&^& npm start
echo.
echo Maestro pronto para escalar! 🚀
pause
