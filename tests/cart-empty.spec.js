const { test } = require('./fixtures/testFixtures');
const { orderData } = require('./data/orderData');

test.describe('Cart empty state', () => {
  test('removes all added fruits and shows empty cart message', async ({ authPage, shopPage, cartPage }) => {
    await shopPage.open();
    await authPage.signInIfAvailable(orderData.credentials.email, orderData.credentials.password);
    await shopPage.open();

    for (const item of orderData.items) {
      await shopPage.addProductQuantity(item.name, item.quantity);
    }

    await shopPage.openCart();
    await cartPage.removeAllItemsFromCart();
    await cartPage.expectCartEmptyMessage();
  });
});
