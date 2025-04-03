
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import Feedback from '../components/Feedback';
import FeedbackChatRoom from '../components/FeedbackChatRoom';
import ProtectedRoutes from '../utilityComponents/ProtectedRoutes';
import './App.css'
import { Provider } from 'react-redux';
import { store } from '../reduxstore/store';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appSidebar"

function App() {

  return (
    
    <Provider store={store}>
      <SidebarProvider>
        <AppSidebar />
          <main>
            <SidebarTrigger />
      <Router>
        <Routes>
        <Route path='/' element={<Login />} ></Route>
        <Route path='/feedback' element={<Feedback />}></Route>
        <Route path='/newadmin' element={<AppSidebar />}></Route>
        <Route path='/admin' element={<ProtectedRoutes />}>
            <Route index element={<FeedbackChatRoom/>}></Route>
        </Route>
        </Routes>
      </Router>
      </main>
      </SidebarProvider>

      </Provider>
    
  )
}

export default App
