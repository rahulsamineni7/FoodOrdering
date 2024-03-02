import { View, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';
import * as ImagePicker from 'expo-image-picker';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string|null>(null);

    const resetFields = () => {
        setName('');
        setPrice('');
        setErrors('');
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }
        console.warn("Creating product", name, price, image);
        resetFields();
    }

    const validateInput = () => {
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price must be a number');
            return false;
        }
        return true;
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    

    return (
        <View style={styles.container}>
             <Image source={{ uri: image ||'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png' }} style={styles.image} />
            <Pressable onPress={pickImage}>
                <Text style={styles.textButton}>Select Image</Text>
            </Pressable>
            <Text style={styles.label}>Name</Text>
            <TextInput
                onChangeText={setName}
                value={name}
                placeholder='Name'
                style={styles.input}
            />

            <Text style={styles.label}>Price($)</Text>
            <TextInput
                onChangeText={setPrice}
                value={price}
                placeholder='Price'
                style={styles.input}
                keyboardType='numeric'
            />
            <Text style={styles.errorText}>{errors}</Text>
            <Button onPress={onCreate} text='Create' />
            <Button onPress={resetFields} text='Reset' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    }
});

export default CreateProductScreen;
