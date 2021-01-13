// import logo from './logo.svg';
import { Component } from 'react';
import { Element } from 'react-scroll';
import './App.css';
import TopBar from './components/common/TopBar';
import ProductionCombined from './components/ProductionCombined';
import BloodCombined from './components/BloodCombined';
import PrescriptionCombined from './components/PrescriptionCombined';
import Doctors from './components/Doctors/Doctors';
import Clinics from './components/Clinics/Clinics';
import Lysates from './components/Lysates/Lysates';
import Products from './components/Products/Products';
import Persons from './components/Persons/Persons';

import PersonsContextProvider from './components/contexts/PersonsContext';
import ClinicsContextProvider from './components/contexts/ClinicsContext';
import DoctorsContextProvider from './components/contexts/DoctorsContext';
import LysatesContextProvider from './components/contexts/LystateContext';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <div style={{ paddingTop: '70px' }}>
          <PersonsContextProvider>
            <LysatesContextProvider>
              <ClinicsContextProvider>
                <Element name="ProductionCombined">
                  <ProductionCombined />
                </Element>
                <Element name="BloodCombined">
                  <BloodCombined />
                </Element>
                <DoctorsContextProvider>
                  <Element name="PrescriptionCombined">
                    <PrescriptionCombined />
                  </Element>
                  <Element name="Doctors">
                    <Doctors />
                  </Element>
                </DoctorsContextProvider>
                <Element name="Clinics">
                  <Clinics />
                </Element>
              </ClinicsContextProvider>
              <Element name="Lysates">
                <Lysates />
              </Element>
            </LysatesContextProvider>
            <Element name="Products">
              <Products />
            </Element>
            <Element name="Persons">
              <Persons />
            </Element>
          </PersonsContextProvider>
        </div>
        <div className="dummy">
          <h3>Other options</h3>
        </div>
      </div>
    );
  }
}

export default App;
