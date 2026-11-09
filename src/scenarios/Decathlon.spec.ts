import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import DecathlonPage from '../support/pages/DecathlonPage';

test.describe('Decathlon', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.decathlon')
    .retrieveData();
  let decathlonPage: DecathlonPage;

  test.beforeEach(async ({ page }) => {
    decathlonPage = new DecathlonPage(page);
    await page.goto(BASE_URL);
    await decathlonPage.aceitarCookies();
  });

  test('Validar página de Black Friday', async () => {
    await decathlonPage.validarPaginaBlackFriday();
  });

  test('Buscar produto pelo campo de busca', async () => {
    await decathlonPage.buscarProduto('tênis de corrida');
    await decathlonPage.validarResultadoBusca();
  });

  test('Abrir detalhes de um produto', async () => {
    await decathlonPage.buscarProduto('bicicleta');
    await decathlonPage.validarResultadoBusca();
    await decathlonPage.abrirPrimeiroProduto();
    await decathlonPage.validarDetalhesProduto();
  });
});
