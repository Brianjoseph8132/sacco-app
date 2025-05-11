import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Service from './pages/Service'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateAccount from './pages/CreatAccount'
import LoanApplication from './pages/LoanApplication'
import Repayment from './pages/Repayment'
import Transaction from './pages/Transaction'
import DashBoard from './pages/DashBoard'
import { UserProvider } from './context/UserContext'
import Contact from './pages/Contact'
import { AccountProvider } from './context/AccountContext'


function App() {
  

  return (
    <BrowserRouter>
      <UserProvider>
        <AccountProvider>
        

          <Routes>
            <Route>
              <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='about' element={<About/>}/>
              <Route path='service' element={<Service/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='account' element={<CreateAccount/>}/>
              <Route path='loanappliaction'element={<LoanApplication/>}/>
              <Route path='repayment' element={<Repayment/>}/>
              <Route path='transaction' element={<Transaction/>}/>
              <Route path='dashboard' element={<DashBoard/>}/>
              <Route path='contact' element={<Contact/>}/>
              </Route>
            </Route>
          </Routes>

        </AccountProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
