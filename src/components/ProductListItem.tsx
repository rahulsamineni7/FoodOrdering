import { StyleSheet,Image,FlatList,Pressable } from 'react-native';



import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text} from '@/src/components/Themed';

import {Link, useSegments} from 'expo-router'
import Colors from "../constants/Colors";
import { Product} from '../types';

type ProductListItemProps={
product:Product
}


const ProductListItem=({product}:ProductListItemProps)=>{

  const segments=useSegments()
 
 
  return(


    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
      <Image source={{ uri: product.image || 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png' }}
       style={styles.image}
       resizeMode='contain'
       
       />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

      

    </Pressable>
       </Link>
  )
}
export default ProductListItem

const styles = StyleSheet.create({
  container: {
backgroundColor:'white',
padding:10,
borderRadius:20,
marginLeft:10,
margin:5,
flex:1
  },
  
  
  title:{
    fontSize:15,
    fontWeight:'500',
    color:"black"
    
    
  },
  price:{

    color:Colors.light.tint,
    fontWeight:'bold'
  },
  image:{
    width:100,
    aspectRatio:1
  }
});
