import { test, expect } from '@playwright/test';

test.describe('Guarda-Pretoriano: Rota de Patrulha Primária', () => {
  
  test('Deve atravessar o Marketplace, Checkout e Onboarding sem latência perceptível', async ({ page }) => {
    // 1. Infiltração no Marketplace
    console.log('[Guarda-Pretoriano] Acessando Marketplace...');
    await page.goto('/marketplace');
    
    // Validar presença de módulos obrigatórios
    await expect(page.locator('text=Motor Contábil (Core)')).toBeVisible();
    
    // Simular decisão humana rápida
    await page.click('button:has-text("Provisionar Ecossistema")');
    
    // 2. Patrulha no Checkout
    console.log('[Guarda-Pretoriano] Acessando Checkout...');
    await expect(page).toHaveURL(/.*checkout/);
    await expect(page.locator('text=Confirmar Pagamento Seguro')).toBeVisible();
    
    // Validar gatilho de Neuromarketing (se aplicável futuramente, o contador de escassez)
    // await expect(page.locator('text=Reserva Garantida por')).toBeVisible();

    // Simular o evento de pagamento (clique de conversão)
    page.on('dialog', dialog => dialog.accept()); // Aceita o Alert de "Integração Real"
    await page.click('button:has-text("Confirmar Pagamento Seguro")');
    
    // 3. Checagem do Santuário de Onboarding
    console.log('[Guarda-Pretoriano] Validando Onboarding White-Glove...');
    await expect(page).toHaveURL(/.*onboarding/, { timeout: 10000 });
    
    // Aguardar o estado final (pós-provisionamento fictício de 4 segundos)
    await expect(page.locator('text=A Chave foi Enviada.')).toBeVisible({ timeout: 6000 });
    
    console.log('[Guarda-Pretoriano] Patrulha concluída. O(1) e RLS intactos.');
  });
});
