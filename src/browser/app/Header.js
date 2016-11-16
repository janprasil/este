/* @flow */
import React from 'react';
import { Link, Space, Toolbar } from '../app/components';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
  prefetch: {
    display: 'none',
  },
};

const Header = () => (
  <Toolbar style={styles.toolbar}>
    <Link bold inverted exactly to="/">Homepage</Link>
    <Space x={2} />
    <Link bold inverted to="/loan">
      Loans
    </Link>
  </Toolbar>
);

export default Header;
