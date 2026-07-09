const { test } = require('./fixtures/testFixtures');
const { orderData } = require('./data/orderData');

test.describe('Cart promo code validation', () => {
  test('shows an error for an invalid promo code', async ({ authPage, shopPage, cartPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    await shopPage.addProducts(orderData.items);

    await shopPage.openCart();
    await cartPage.proceedToCheckout();
    await cartPage.applyPromoCode('1234');
    await cartPage.expectInvalidPromoError();
  });

  test('shows an error when applying an empty promo code', async ({ authPage, shopPage, cartPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    await shopPage.addProducts(orderData.items);

    await shopPage.openCart();
    await cartPage.proceedToCheckout();
    await cartPage.applyPromoCode('');
    await cartPage.expectEmptyPromoError();
  });

  test('rejects a promo code with surrounding whitespace', async ({ authPage, shopPage, cartPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    await shopPage.addProducts(orderData.items);

    await shopPage.openCart();
    await cartPage.proceedToCheckout();
    await cartPage.applyPromoCode(' rahulshettyacademy ');
    await cartPage.expectInvalidPromoError();
  });

  test('applies a valid promo code successfully', async ({ authPage, shopPage, cartPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    await shopPage.addProducts(orderData.items);

    await shopPage.openCart();
    await cartPage.proceedToCheckout();
    await cartPage.applyPromoCode('rahulshettyacademy');
    await cartPage.expectValidPromoApplied();
  });
});