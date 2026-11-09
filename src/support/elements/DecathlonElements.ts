import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class DecathlonElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getBotaoAceitarCookies(): Locator {
    return this.page
      .getByRole('button', { name: /aceitar|concordo|accept/i })
      .first();
  }

  getLogo(): Locator {
    return this.page.locator('header a[href="/"]').first();
  }

  getCampoBusca(): Locator {
    // Placeholder do campo muda (texto rotativo), por isso não usamos o nome
    return this.page.getByRole('textbox').first();
  }

  getLinksProdutos(): Locator {
    return this.page
      .getByRole('link', { name: /% OFF/ })
      .or(this.page.locator('a[href*="/R-p-"], a[href$="/p"]'));
  }

  getPrecoProduto(): Locator {
    return this.page.getByText(/R\$\s?\d/).first();
  }

  getBotaoComprar(): Locator {
    return this.page.getByTestId('comprar-agora-buy-button');
  }

  getTituloProduto(): Locator {
    return this.page.locator('h1').first();
  }
}
