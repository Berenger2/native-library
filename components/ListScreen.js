import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useApi } from '../context/ApiContext';

export default function ListScreen({ navigation }) {
    const [books, setBooks] = useState([]);
    const apiUrl = useApi();

    useFocusEffect(
        React.useCallback(() => {
            fetchBooks();
        }, [])
    );

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${apiUrl}/books`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const deleteBook = async (id) => {
        try {
            await fetch(`${apiUrl}/books/${id}`, {
                method: 'DELETE',
            });
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const updateBook = (id) => {
        navigation.navigate('update', { bookId: id });
    };

    const item_book = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text>{item.year}</Text>
            <Text>{item.author}</Text>
            <Text>{item.category}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Update" onPress={() => updateBook(item.id)} />
                <Button title="Delete" color="red" onPress={() => deleteBook(item.id)} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
          <Image source={require('../assets/books.png')} style={styles.icon} />
            <Text style={styles.header}>List of Books</Text>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={books}
                renderItem={item_book}
                ListEmptyComponent={<Text>No books available.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',


    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'blue',

    },
    description: {
        textTransform: 'italic',
        marginBottom: 8,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    icon: {
        width: 70,
        height: 70,
        marginBottom: 10,
        alignSelf: 'center',
    },
});
