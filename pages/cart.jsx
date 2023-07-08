import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '@/utils/Store';
import Layout from '@/components/Layout';

const cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <Layout title="Carrinho">
      {cartItems.length === 0 ? (
        <div>Vazio</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item} className="">
              {item.name}
              <div className="">
                <button type="button" onClick={() => removeItemHandler(item)}>
                  Deletar
                </button>
              </div>
              <select
                value={item.quantity}
                onChange={(e) => updateCartHandler(item, e.target.value)}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(cart), { ssr: false });
