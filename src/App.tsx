
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import Feedback from '../components/Feedback';
import FeedbackChatRoom from '../components/FeedbackChatRoom';
import ProtectedRoutes from '../utilityComponents/ProtectedRoutes';
import './App.css'
import { Provider } from 'react-redux';
import { store } from '../reduxstore/store';

function App() {

  return (
    
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path='/' element={<Login />} ></Route>
        <Route path='/feedback' element={<Feedback />}></Route>
        <Route path='/admin' element={<ProtectedRoutes />}>
            <Route index element={<FeedbackChatRoom/>}></Route>
        </Route>
        </Routes>
      </Router>

      </Provider>
    
  )
}

export default App
