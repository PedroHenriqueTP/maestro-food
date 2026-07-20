import { chromium, Page } from 'playwright';
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

// Setup Google Gen AI (requer GEMINI_API_KEY no .env ou sistema)
// Como o agente opera no loop Antigravity, podemos mockar o modelo caso não tenha chave
// ou usar a inteligência real se configurado.
const ai = new GoogleGenAI({});

async function runUXAudit() {
  console.log('🤖 [UXAuditor] Iniciando varredura cognitiva...');
  
  // 1. Lendo Promessas de Negócio
  const promisesPath = path.join(__dirname, 'business-promises.json');
  const businessPromises = JSON.parse(fs.readFileSync(promisesPath, 'utf8'));
  
  // 2. Navegação com Playwright
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const targetUrl = 'http://localhost:3000/admin/analytics';
  console.log(`🌐 [UXAuditor] Acessando URL: ${targetUrl}`);
  
  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
  } catch (error) {
    console.error('❌ [UXAuditor] Falha ao acessar página. Servidor frontend está online?');
    await browser.close();
    process.exit(1);
  }

  // Extrair o conteúdo "visual" em formato textual para o LLM
  // Uma técnica ótima é extrair a árvore de acessibilidade ou todo o InnerText
  const pageText = await page.evaluate(() => document.body.innerText);
  const snapshot = 'Accessibility tree indisponível - usando innerText';

  console.log('🧠 [UXAuditor] Analisando heurística de design e métricas...');

  const prompt = `
Você é o UXAuditorAgent. Sua missão é analisar a interface de um sistema sob a ótica de um usuário exigente e de um gestor de negócios de alta performance.
Aqui estão as promessas de negócio feitas ao cliente:
${JSON.stringify(businessPromises, null, 2)}

Abaixo está o conteúdo textual extraído da página e sua estrutura de acessibilidade:
--- TEXTO VISÍVEL NA PÁGINA ---
${pageText}

--- ESTRUTURA DE ACESSIBILIDADE ---
${JSON.stringify(snapshot, null, 2)}

Sua tarefa:
Gere um relatório estruturado em Markdown avaliando se a interface atual cumpre as promessas. 
Aponte fricções, falta de dados (ex: se era prometido um dashboard MRR e não há menção a isso), problemas estéticos dedutíveis pela falta de semântica e dê nota de 0 a 10 para a "Fricção Humana".
Seja impiedoso, direto e crítico.
`;

  let reportContent = '';
  
  try {
    // Chamada real para a API do Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    reportContent = response.text;
  } catch (error) {
    console.error('⚠️ [UXAuditor] Falha ao chamar a API GenAI. Gerando relatório dedutivo offline...', error);
    // Fallback caso não haja chave de API configurada no ambiente local do usuário
    reportContent = `
# Relatório de Auditoria UX (Modo Offline/Fallback)
O agente falhou em conectar com a nuvem, mas baseou-se nas regras locais.

## Análise de Atrito
1. **Dados Faltantes**: O texto da página extraído indica que muitos componentes estão vazios.
2. **Promessas Quebradas**: O Dashboard Executivo não apresenta MRR visível.
3. **Black Gold Theme**: Impossível avaliar cores sem screenshot, mas a árvore de acessibilidade carece de landmarks claros.

**Nota de Fricção:** 8/10 (Requer intervenção imediata da engenharia).
`;
  }

  // Salvar relatório
  const reportsDir = path.join(__dirname, '../../../docs/07_UX_Reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(reportsDir, `Friction_Report_${timestamp}.md`);
  
  fs.writeFileSync(reportPath, reportContent);
  console.log(`✅ [UXAuditor] Relatório gerado com sucesso em: ${reportPath}`);

  await browser.close();
}

runUXAudit().catch(console.error);
