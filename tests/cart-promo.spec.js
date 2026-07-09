const { test } = require('./fixtures/testFixtures');
const { orderData } = require('./data/orderData');

test.describe('Cart promo code validation', () => {
  test('shows an error for an invalid promo code', async ({ authPage, shopPage, cartPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    for (const item of orderData.items) {
      await shopPage.addProductQuantity(item.name, item.quantity);
    }

    await shopPage.openCart();
    await cartPage.proceedToCheckout();
    await cartPage.applyPromoCode('1234');
    await cartPage.expectInvalidPromoError();
  });
});