class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.placeOrderButton = page.getByRole('button', { name: /^place order$/i });
    this.countryDropdown = page.locator('select').first();
    this.termsCheckbox = page.locator('input.chkAgree').first();
    this.proceedButton = page.getByRole('button', { name: /^proceed$/i });
    this.successBanner = page.locator('.wrapperTwo').first();
  }

  async placeOrder(country) {
    await this.placeOrderButton.click();

    await this.countryDropdown.selectOption({ label: country });

    await this.termsCheckbox.check();
    await this.proceedButton.click();
  }

  successMessage() {
    return this.successBanner;
  }
}

module.exports = { CheckoutPage };
