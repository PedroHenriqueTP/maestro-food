import { Test, TestingModule } from '@nestjs/testing';
import { LedgerService } from './ledger.service';
import { BadRequestException } from '@nestjs/common';
import { EntryType } from '@prisma/client';

describe('LedgerService', () => {
  let service: LedgerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LedgerService],
    }).compile();

    service = module.get<LedgerService>(LedgerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should throw BadRequestException when debits and credits do not match', async () => {
      const data = {
        tenantId: 'tenant-123',
        description: 'Venda Desbalanceada',
        date: new Date(),
        entries: [
          { accountId: 'acc-1', type: EntryType.DEBIT, amount: 1000 },
          { accountId: 'acc-2', type: EntryType.CREDIT, amount: 900 },
        ],
      };

      await expect(service.createTransaction(data)).rejects.toThrow(BadRequestException);
      await expect(service.createTransaction(data)).rejects.toThrow(/Desequilíbrio Contábil/);
    });

    it('should throw BadRequestException when transaction amount is zero', async () => {
      const data = {
        tenantId: 'tenant-123',
        description: 'Venda Zerada',
        date: new Date(),
        entries: [
          { accountId: 'acc-1', type: EntryType.DEBIT, amount: 0 },
          { accountId: 'acc-2', type: EntryType.CREDIT, amount: 0 },
        ],
      };

      await expect(service.createTransaction(data)).rejects.toThrow(BadRequestException);
      await expect(service.createTransaction(data)).rejects.toThrow(/Uma transação deve ter valor maior que zero/);
    });
  });
});
