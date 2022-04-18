import React from 'react';
import store from './redux/reduxStore';
import { initializeApp } from './redux/appReducer';
import { connect, Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Nav from './components/Nav/Nav';
import News from './components/News/News';

import ImageLoading from './components/common/Loading/loading';
import HeaderContainer from './components/Header/HeaderContainer';
import GitHub from './useEffect_Samurai/GitHubApi';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }
  render() {

    if (!this.props.initialized) {
      return <ImageLoading />
    }
    return (
      <div className='app-wraper'>
        <HeaderContainer />
        <Nav />
        <div className='wraper-content'>
          <React.Suspense fallback={<ImageLoading />}>
            <Route path='/profile/:userId*' render={() => <ProfileContainer />} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/users' render={() => <UsersContainer />} />
          </React.Suspense>
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/login' render={() => <Login />} />
          <Route path='/github' render={() => <GitHub />} />
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

const AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const AppSamuraiJs = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default AppSamuraiJs;


