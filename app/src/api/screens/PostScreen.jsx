// src/screens/PostScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPost, getComments } from '../jsonPlaceholder';

const PostScreen = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    const response = await getPost(id);
    setPost(response.data);
  };

  const fetchComments = async () => {
    const response = await getComments(id);
    setComments(response.data);
  };

  if (!post) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.commentsTitle}>Comments:</Text>
      <FlatList
        data={comments}
        keyExtractor={(comment) => comment.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentEmail}>{item.email}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    marginVertical: 10,
  },
  commentsTitle: {
    fontSize: 18,
    marginTop: 20,
  },
  comment: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  commentEmail: {
    fontWeight: 'bold',
  },
});

export default PostScreen;
