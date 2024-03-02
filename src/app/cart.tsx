import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useCart } from '../providers/CartProviders';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

function CartScreen() {
  const { items,total } = useCart();

  return (
   
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{padding:10,gap:10}}
        />
        <Text>Total:${total}</Text>
    <Button text='Checkout'/>
    </View>
        
  );
}

export default CartScreen;
