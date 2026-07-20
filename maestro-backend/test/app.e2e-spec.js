"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("./../src/app.module");
const prisma_service_1 = require("../src/prisma/prisma.service");
describe('Maestro Backend (e2e)', () => {
    let app;
    const mockPrismaService = {
        onModuleInit: jest.fn(),
        onModuleDestroy: jest.fn(),
        $connect: jest.fn(),
        $disconnect: jest.fn(),
    };
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        })
            .overrideProvider(prisma_service_1.PrismaService)
            .useValue(mockPrismaService)
            .compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('/billing/webhook (POST) - Deve retornar 200 para payload válido (sem autenticação)', () => {
        return request(app.getHttpServer())
            .post('/billing/webhook')
            .send({
            type: 'checkout.session.completed',
            data: { object: { id: 'evt_test', customer_details: { email: 'test@maestro.app' }, amount_total: 5000 } }
        })
            .expect(200);
    });
    it('/intelligence/analyze (POST) - Deve retornar 401 Unauthorized sem Token JWT', () => {
        // Isso deve falhar com 401 pois será protegido pelo JwtAuthGuard
        return request(app.getHttpServer())
            .post('/intelligence/analyze')
            .send({ target: 'revenue' })
            .expect(401);
    });
});
//# sourceMappingURL=app.e2e-spec.js.map