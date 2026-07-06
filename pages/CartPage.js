const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartPreview = page.locator('.cart-preview').first();
    this.proceedToCheckoutButton = page.getByRole('button', { name: /proceed to checkout/i });
    this.removeButtons = page.locator('.cart-preview .product-remove');
    this.emptyCartMessage = page.locator('.cart-preview').getByText(/you cart is empty|cart is empty|no product/i).first();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async removeAllItemsFromCart() {
    await expect(this.cartPreview).toBeVisible();

    while ((await this.removeButtons.count()) > 0) {
      await this.removeButtons.first().click();
    }
  }

  async expectCartEmptyMessage() {
    await expect(this.emptyCartMessage).toBeVisible();
  }
}

module.exports = { CartPage };
