import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useApi } from '../context/ApiContext';


export default function AddScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const apiUrl = useApi();

    const clearForm = () => {
        setTitle("");
        setAuthor("");
        setCategory("");
        setDescription("");
        setYear("");
    };

    const handleSubmit = async () => {
        const book = {
            title: title,
            description: description,
            year: year,
            author: author,
            category: category
        };

        try {
            const response = await fetch(`${apiUrl}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            if (response.ok) {
                clearForm();
                navigation.navigate('list');
            } else {
                const errorData = await response.json();
                console.error('Error adding book:', errorData);
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };
    const handleCancel = () => {
      navigation.navigate('list'); 
  };


    return (
        <View>
            <Text style={styles.title}>Ajouter un livre</Text>

            <Text>Titre du livre</Text>
            <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder="titre du livre"
            />

            <Text>Description </Text>
            <TextInput
                style={styles.textInput}
                value={description}
                onChangeText={setDescription}
                multiline={true}
                placeholder="Description du livre"
            />

            <Text>Année de parution</Text>
            <TextInput
                style={styles.textInput}
                value={year}
                onChangeText={setYear}
                placeholder="2024"
                keyboardType="numeric"
            />

            <Text>Auteur</Text>
            <TextInput
                style={styles.textInput}
                value={author}
                onChangeText={setAuthor}
                placeholder="Maestrati François"
            />

            <Text>Category</Text>
            <TextInput
                style={styles.textInput}
                value={category}
                onChangeText={setCategory}
                placeholder="Fantastique"
            />
            <Button title="Ajouter le livre" onPress={handleSubmit} />
            <Button title="Annuler" onPress={handleCancel} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});
