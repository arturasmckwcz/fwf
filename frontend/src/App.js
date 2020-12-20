// import logo from './logo.svg';
import { Component } from 'react'
import { Element } from 'react-scroll'
import './App.css';
import TopBar from './components/TopBar'
import ProductionCombined from './components/ProductionCombined'
import BloodCombined from './components/BloodCombined'
import PrescriptionCombined from './components/PrescriptionCombined'
import NewProductionFile from './components/NewProductionFile'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <TopBar />
        <div style={{ paddingTop: '70px' }}>
          <Element name='ProductionCombined'>
            <ProductionCombined />
          </Element>
          <Element name='BloodCombined'>
            <BloodCombined />
          </Element>
          <Element name='PrescriptionCombined'>
            <PrescriptionCombined />
          </Element>
          <Element name='NewProductionFile'>
            <NewProductionFile />
          </Element>
        </div>
        <div className='dummy'><h3>Other options</h3></div>
      </div>
    )
  }
}

export default App;
