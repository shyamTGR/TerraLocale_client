import React, { useState } from 'react';
import styles from './OrderHistory.module.css';

const fakeOrderHistoryData = [
  {
    orderId: '#12345',
    orderDate: '04/28/2023',
    orderTotal: 150.00,
    items: [
      {
        name: 'Cadbury',
        quantity: 2,
        price: 50.00,
      },
      {
        name: 'Kitkat',
        quantity: 1,
        price: 50.00,
      }
    ]
  },
  {
    orderId: '#67890',
    orderDate: '04/27/2023',
    orderTotal: 75.00,
    items: [
      {
        name: 'Snickers',
        quantity: 1,
        price: 25.00,
      }
    ]
  }
];

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState(fakeOrderHistoryData);

  return (
    <div className={styles.container}>
      <h1 style={{margin:"10px"}}>Order History</h1>
      {orderHistory.map(order => (
        <div key={order.orderId} className={styles.order}>
          <h2>Order {order.orderId}</h2>
          <p>Date: {order.orderDate}</p>
          <p>Total: ${order.orderTotal.toFixed(2)}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.name}>
                {item.name} x {item.quantity} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
