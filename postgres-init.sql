-- Cria o usuário da aplicação que não é superuser
CREATE USER maestro_app_user WITH PASSWORD 'app_secret_123';

-- Permite que esse usuário acesse o banco
GRANT CONNECT ON DATABASE maestro TO maestro_app_user;

-- Permite o uso do schema public
GRANT USAGE ON SCHEMA public TO maestro_app_user;

-- Dá permissão nas tabelas e sequências atuais e futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO maestro_app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO maestro_app_user;

-- Garante acesso às tabelas que possivelmente já foram criadas
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO maestro_app_user;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO maestro_app_user;
