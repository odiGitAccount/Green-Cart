const { test, expect } = require('./fixtures/testFixtures');
const { orderData } = require('./data/orderData');

test.describe('Order placement', () => {
  test('places an order successfully for selected fruits', async ({ page, authPage, shopPage, cartPage, checkoutPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    await shopPage.addProducts(orderData.items);

    await shopPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder(orderData.country);
    await expect(checkoutPage.successMessage()).toContainText(/thank you|successfully/i);
    await expect(page).toHaveURL(/.*seleniumPractise.*/);
  });
});
