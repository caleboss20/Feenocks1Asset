
import Navbar from './components/Navbar';
import './index.css';
import Homepage from './components/Homepage';
import {Route,Routes} from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './SignIn';


function App() {
  return (
    <div className='w-full bg-white'>
      <Navbar />
        <Routes>
        <Route path="/" element={ <Homepage />} />
        <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
       </div>
  )
}

export default App
