class AuthPage {
  constructor(page) {
    this.page = page;
    this.signInLink = page.getByRole('link', { name: /sign in/i });
    this.emailInput = page.locator('input[type="email"], #email').first();
    this.passwordInput = page.locator('input[type="password"], #password').first();
    this.loginButton = page.getByRole('button', { name: /sign in|login/i }).first();
  }

  async signInIfAvailable(email, password) {
    if (!email || !password) return;
    if ((await this.signInLink.count()) === 0) return;

    await this.signInLink.first().click();

    if ((await this.emailInput.count()) === 0 || (await this.passwordInput.count()) === 0) return;

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if ((await this.loginButton.count()) > 0) {
      await this.loginButton.click();
    }
  }
}

module.exports = { AuthPage };
