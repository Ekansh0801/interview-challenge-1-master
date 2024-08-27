import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { isSmallerDevice } = useWindowWidth();
  const postsPerPage = isSmallerDevice ? 5 : 10;

  useEffect(() => {
    fetchPosts(page);
  }, [page, isSmallerDevice]);

  const fetchPosts = async (pageNumber) => {
    setIsLoading(true);
    try {
      const { data: fetchedPosts } = await axios.get('/api/v1/posts', {
        params: {
          _start: pageNumber * postsPerPage,
          _limit: postsPerPage,
        },
      });

      if (fetchedPosts.length < postsPerPage) {
        setHasMore(false);
      }

      const userName = 'Leanne Graham';
      const userEmail = 'Sincere@april.biz';

      const postsWithUserDetails = fetchedPosts.map(post => ({
        ...post,
        userName,
        userEmail,
      }));

      setPosts(prevPosts => [...prevPosts, ...postsWithUserDetails]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Container>
      <PostListContainer>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        ) : (
          <div>No posts available</div>
        )}
      </PostListContainer>

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
