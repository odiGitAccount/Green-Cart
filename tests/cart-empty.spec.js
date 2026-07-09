const { test } = require('./fixtures/testFixtures');
const { orderData } = require('./data/orderData');

test.describe('Cart empty state', () => {
  test('removes all added fruits and shows empty cart message', async ({ authPage, shopPage, cartPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    await shopPage.addProducts(orderData.items);

    await shopPage.openCart();
    await cartPage.removeAllItemsFromCart();
    await cartPage.expectCartEmptyMessage();
  });
});
