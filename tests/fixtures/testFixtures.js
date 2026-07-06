const base = require('@playwright/test');
const { AuthPage } = require('../../pages/AuthPage');
const { ShopPage } = require('../../pages/ShopPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

const test = base.test.extend({
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

module.exports = {
  test,
  expect: base.expect,
};
