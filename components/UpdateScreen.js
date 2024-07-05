import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useApi } from '../context/ApiContext';

export default function UpdateScreen({ route, navigation }) {
    const { bookId } = route.params;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const apiUrl = useApi();

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const response = await fetch(`${apiUrl}/books/${bookId}`);
            const data = await response.json();
            setTitle(data.title);
            setDescription(data.description);
            setYear(data.year.toString());
            setAuthor(data.author);
            setCategory(data.category);
        } catch (error) {
            console.error('Error fetching book:', error);
        }
    };

    const handleUpdate = async () => {
        const updatedBook = {
            title: title,
            description: description,
            year: year,
            author: author,
            category: category
        };

        try {
            const response = await fetch(`${apiUrl}/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });
            if (response.ok) {
                navigation.navigate('list');
            } else {
                const errorData = await response.json();
                console.error('Error updating book:', errorData);
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };
    const handleCancel = () => {
        navigation.navigate('list'); 
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mise à jour</Text>

            <Text style={styles.about}>{title}</Text>

            <Text>Titre du livre</Text>
            <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Titre du livre"
            />

            <Text>Description</Text>
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
                placeholder="Auteur"
            />

            <Text>Catégorie</Text>
            <TextInput
                style={styles.textInput}
                value={category}
                onChangeText={setCategory}
                placeholder="Catégorie"
            />
             <Button title="Mettre à jour le livre" onPress={handleUpdate} />
             <Button title="Annuler" onPress={handleCancel} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    textInput: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    about: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 16,

    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});
