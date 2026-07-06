const orderData = {
  credentials: {
    email: process.env.RAHUL_EMAIL,
    password: process.env.RAHUL_PASSWORD,
  },
  items: [
    { name: 'Mango', quantity: 2 },
    { name: 'Water Melon', quantity: 2 },
    { name: 'Strawberry', quantity: 2 },
  ],
  country: 'India',
};

module.exports = { orderData };
