import { View, Text, Image, StyleSheet,Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { useState } from 'react'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProviders'
import { PizzaSize } from '@/src/types'


const sizes:PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const{addItem} =useCart();

 const [selectedSize,SetSelectedSize]=useState<PizzaSize>('M');

 const router=useRouter();

  const product = products.find((p) => p.id.toString() == id);

  const addToCart = () =>{
    if(!product){
      return;
    }
   addItem(product,selectedSize);
   router.push('/cart')
  }


  if (!product) {
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png' }} style={styles.image}  />

      <Text>Select Size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable onPress={() => {
           SetSelectedSize(size)
          }} style={[styles.size,{backgroundColor:selectedSize==size?"gainsboro":'white'}]} key={size}>
            <Text style={[styles.sizeText,{color:selectedSize==size?"black":'grey'}]}>{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart'  ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:'auto'
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap:50
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  },
  
})

export default ProductDetailsScreen
