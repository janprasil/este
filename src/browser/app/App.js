/* @flow */
import './App.css';
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Container } from '../app/components';
import { Match, ThemeProvider } from '../../common/app/components';
import { Miss } from 'react-router';
import { connect } from 'react-redux';


// Pages
import LoanPage from '../loan/LoanPage';
import HomePage from '../home/HomePage';
import NotFoundPage from '../notfound/NotFoundPage';

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas: any = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
];

let App = ({ currentLocale, currentTheme }) => (
  <ThemeProvider
    theme={themes.initial}
  >
    <Container>
      <Helmet
        htmlAttributes={{ lang: currentLocale }}
        meta={[
          ...bootstrap4Metas,
          {
            name: 'description',
            content: 'Loan calculator',
          },
          ...favicon.meta,
        ]}
        link={[
          ...favicon.link,
        ]}
      />
      <Header />
      <Match exactly pattern="/" component={HomePage} />
      <Match exactly pattern="/loan" component={LoanPage} />
      <Miss component={NotFoundPage} />
      <Footer />
    </Container>
  </ThemeProvider>
);

App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

App = connect(
  state => ({
    currentLocale: state.intl.currentLocale,
    currentTheme: state.themes.currentTheme,
  }),
)(App);

export default start(App);
