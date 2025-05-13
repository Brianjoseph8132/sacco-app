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
import History from './pages/History'
import { LoanProvider } from './context/LoanContext'
import RepaymentHistory from './pages/RepaymentHistory'
import Notification from './pages/Notification'


function App() {
  

  return (
    <BrowserRouter>
      <UserProvider>
        <AccountProvider>
          <LoanProvider>
        

            <Routes>
              <Route>
                <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='service' element={<Service/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='account' element={<CreateAccount/>}/>
                <Route path='appliaction' element={<LoanApplication/>}/>
                <Route path='repayment/:loan_id' element={<Repayment/>}/>
                <Route path='transaction' element={<Transaction/>}/>
                <Route path='dashboard' element={<DashBoard/>}/>
                <Route path='contact' element={<Contact/>}/>
                <Route path='/history' element={<History/>}/>
                <Route path='/repayment_history/:loan_id' element={<RepaymentHistory/>}/>
                <Route path='/notifications' element={<Notification/>}/>
                </Route>
              </Route>
            </Routes>

          </LoanProvider>
        </AccountProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
