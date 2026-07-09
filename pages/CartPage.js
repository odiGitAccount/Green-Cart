const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartPreview = page.locator('.cart-preview').first();
    this.proceedToCheckoutButton = page.getByRole('button', { name: /proceed to checkout/i });
    this.removeButtons = page.locator('.cart-preview .product-remove');
    this.emptyCartMessage = page.locator('.cart-preview').getByText(/you cart is empty|cart is empty|no product/i).first();
    this.promoCodeInput = page.locator('input.promoCode');
    this.applyPromoButton = page.locator('button.promoBtn');
    this.promoErrorMessage = page.locator('.promoInfo');
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

  async applyPromoCode(code) {
    await this.promoCodeInput.fill(code);
    await this.applyPromoButton.click();
  }

  async expectInvalidPromoError() {
    await expect(this.promoErrorMessage).toHaveText(/invalid code/i);
  }

  async expectEmptyPromoError() {
    await expect(this.promoErrorMessage).toHaveText(/empty code/i);
  }

  async expectValidPromoApplied() {
    await expect(this.promoErrorMessage).toHaveText(/code applied/i);
    const totalPrice = Number(await this.page.locator('.totAmt').innerText());
    const discountPercentageText = await this.page.locator('.discountPerc').innerText();
    const discountedTotal = Number(await this.page.locator('.discountAmt').innerText());

    const discountPercentage = Number(discountPercentageText.replace(/[^\d.]/g, ''));
    const expectedTotal = totalPrice - totalPrice * (discountPercentage / 100);

    expect(discountedTotal).toBeCloseTo(expectedTotal, 1);
  }
}

module.exports = { CartPage };
