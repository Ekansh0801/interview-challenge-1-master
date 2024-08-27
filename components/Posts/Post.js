import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const AvatarContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
}));

const Avatar = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#888',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  marginRight: '10px',
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserName = styled.div(() => ({
  fontSize: '16px',
  fontWeight: 'bold',
}));

const UserEmail = styled.div(() => ({
  fontSize: '14px',
  color: '#555',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const imageWidth = carouselRef.current.firstChild.offsetWidth;
      carouselRef.current.scrollBy({
        left: imageWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const imageWidth = carouselRef.current.firstChild.offsetWidth;
      carouselRef.current.scrollBy({
        left: -imageWidth,
        behavior: 'smooth',
      });
    }
  };

  const getInitials = (name) => {
    if (typeof name !== 'string' || !name.trim()) return '';
    const names = name.split(' ');
    const initials = `${names[0]?.charAt(0) || ''}${names[1]?.charAt(0) || ''}`;
    return initials.toUpperCase();
  };

  const initials = getInitials(post.userName);

  return (
    <PostContainer>
      <AvatarContainer>
        <Avatar>{initials}</Avatar>
        <UserInfo>
          <UserName>{post.userName}</UserName>
          <UserEmail>{post.userEmail}</UserEmail>
        </UserInfo>
      </AvatarContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
