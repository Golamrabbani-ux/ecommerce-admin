import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './containers/Home/Home';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useEffect } from 'react';
import { isUserLoggedIn } from './redux/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import Orders from './containers/Orders/Orders';
import Products from './containers/Products/Products';
import Categories from './containers/Categories/Categories';
import { getInitialData } from './redux/actions/initalData.action';
import NewPage from './containers/NewPage/NewPage';
import { getAllCategories } from './redux/actions/category.action';
import HomePageBanner from './containers/HomePageBanner/HomePageBanner';


function App() {
  toast.configure()
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  // User Token Have Localstorage
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    dispatch(getInitialData())
    dispatch(getAllCategories())
  }, [auth.authenticate, dispatch])

  
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/page' component={NewPage} />
        <PrivateRoute path='/products' component={Products} />
        <PrivateRoute path='/orders' component={Orders} />
        <PrivateRoute path='/categories' component={Categories} />
        <PrivateRoute path='/home-page/banner' component={HomePageBanner} />
        

        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
