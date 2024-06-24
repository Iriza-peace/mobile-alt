import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { getPosts, deletePost } from '../jsonPlaceholder';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id);
      console.log('Delete response:', response); // Log the response
      if (response.status === 200) {
        fetchPosts(); // Refresh the posts list after deletion
      } else {
        Alert.alert('Error', 'Failed to delete the post.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to delete the post: ${error.message}`);
    }
  };

  const handleNewPost = (newPost) => {
    // Add new post to the beginning of the posts array
    setPosts([newPost, ...posts]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <TouchableOpacity>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
            <Button title="View" onPress={() => navigation.navigate('Post', { id: item.id })} />
          </View>
        )}
      />
      <Button
        title="Create Post"
        onPress={() => navigation.navigate('CreatePost', { handleNewPost })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  post: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});

export default HomeScreen;
