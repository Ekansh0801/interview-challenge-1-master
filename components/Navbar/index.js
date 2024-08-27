import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 1000,
  padding:'20px 0'
}));

const NavList = styled('ul')(() => ({
  margin: 0,
  padding: 0,
  listStyleType: 'none',
  display: 'flex', 
  justifyContent: 'center',
}));

const ListItem = styled('li')(() => ({
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <Navbar>
      <NavList>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </NavList>
    </Navbar>
  );
};

export default TopNavbar;
