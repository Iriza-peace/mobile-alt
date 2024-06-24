import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createPost } from '../jsonPlaceholder';

const CreatePostScreen = ({ navigation, route }) => {
  const { handleNewPost } = route.params;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await createPost({ title, body });
      // Assuming response.data is the newly created post object
      handleNewPost(response.data); // Call the callback to update HomeScreen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default CreatePostScreen;
