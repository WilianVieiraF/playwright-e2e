import { expect, Page } from '@playwright/test';
import DecathlonElements from '../elements/DecathlonElements';
import BasePage from './BasePage';

export default class DecathlonPage extends BasePage {
  private readonly elements: DecathlonElements;

  constructor(page: Page) {
    super(page);
    this.elements = new DecathlonElements(page);
  }

  async aceitarCookies(): Promise<void> {
    const botao = this.elements.getBotaoAceitarCookies();
    if (await botao.isVisible({ timeout: 5000 }).catch(() => false)) {
      await botao.click();
    }
  }

  async validarPaginaBlackFriday(): Promise<void> {
    await this.verifyUrl(/black-friday/);
    await this.verifyTitle(/decathlon/i);
    await expect(this.elements.getLinksProdutos().first()).toBeVisible();
  }

  async buscarProduto(termo: string): Promise<void> {
    const campo = this.elements.getCampoBusca();
    await expect(campo).toBeVisible();
    await campo.fill(termo);
    await campo.press('Enter');
  }

  async validarResultadoBusca(): Promise<void> {
    await this.verifyUrl(/(busca|search|_q|\bq=)/i);
    await expect(this.elements.getLinksProdutos().first()).toBeVisible();
    expect(await this.elements.getLinksProdutos().count()).toBeGreaterThan(0);
  }

  async abrirPrimeiroProduto(): Promise<void> {
    await this.elements.getLinksProdutos().first().click();
  }

  async validarDetalhesProduto(): Promise<void> {
    await expect(this.elements.getTituloProduto()).toBeVisible();
    await expect(this.elements.getPrecoProduto()).toBeVisible();
    await expect(this.elements.getBotaoComprar()).toBeVisible();
  }

  async voltarParaHome(): Promise<void> {
    await this.elements.getLogo().click();
    await this.verifyUrl(/decathlon\.com\.br\/?$/);
  }
}
