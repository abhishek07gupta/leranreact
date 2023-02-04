import './App.css';
import Navbaar from './components/Navbar'
import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div><Navbaar/>
      <News pageSize={6} country='in' category='business'/>
      </div>
    )
  }
}
