const { expect } = require('@playwright/test');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class ShopPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('a.cart-icon, img[alt="Cart"]').first();
  }

  async open() {
    await this.page.goto('/seleniumPractise/#/');
  }

  async addProductQuantity(productName, quantity) {
    const productTitle = new RegExp(`^\\s*${escapeRegExp(productName)}(?:\\s*-\\s*\\d+(?:\\/\\d+)?\\s*Kg)?\\s*$`, 'i');
    const productCard = this.page
      .locator('.products .product')
      .filter({ has: this.page.locator('h4.product-name', { hasText: productTitle }) })
      .first();
    await expect(productCard).toBeVisible();

    const incrementButton = productCard.locator('.increment');
    const addToCartButton = productCard.getByRole('button', { name: /add to cart/i });

    for (let i = 1; i < quantity; i += 1) {
      await incrementButton.click();
    }

    await addToCartButton.click();
  }

  async addProducts(products) {
    for (const product of products) {
      await this.addProductQuantity(product.name, product.quantity);
    }
  }

  async openCart() {
    await this.cartIcon.click();
  }
}

module.exports = { ShopPage };
