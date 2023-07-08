import React, { useContext } from 'react';
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
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default cart;
