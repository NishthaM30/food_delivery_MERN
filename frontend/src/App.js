import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Restaurants from './components/RestaurantList';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/restaurant/:id' element={<MenuItems />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
