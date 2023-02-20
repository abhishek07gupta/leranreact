import './App.css';
import Navbaar from './components/Navbar'
import React, { useState } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [Progress, setProgress] = useState(0)

 

  return (
    <div>
      <Router>
        <Navbaar />
        <LoadingBar
          color='#f11946'
          progress={Progress}

        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key='' pageSize={6} country='in' category='' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key='sports' pageSize={6} country='in' category='sports' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key='entertainment' pageSize={6} country='in' category='entertainment' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key='health' pageSize={6} country='in' category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key='science' pageSize={6} country='in' category='science' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key='technology' pageSize={6} country='in' category='technology' />}></Route>
        </Routes>
      </Router>
    </div>

  )
}


export default App;