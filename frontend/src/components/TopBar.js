import { Component } from 'react'
import { Link } from 'react-scroll'
import './TopBar.css'

class TopBar extends Component {
  render() {
    return (
      <div className="container-fluid sticky">
        <div style={{ display: 'inline' }}><h3>[FWF]</h3></div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <div className='menuItem'>
            <Link
              activeClass="active"
              to="ProductionCombined"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [New production]
            </Link>
          </div>
          <div className='menuItem'>
            <Link
              activeClass="active"
              to="BloodCombined"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [New blood]
            </Link>
          </div>
          <div className='menuItem'>
            <Link
              activeClass="active"
              to="PrescriptionCombined"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [New prescription]
            </Link>
          </div>
          <div className='menuItem'>
            <Link
              activeClass="active"
              to="NewProductionFile"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [Production file]
            </Link>
          </div>
          <div className='menuItem'>
            <Link
              activeClass="active"
              to="Products"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              [Producs]
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar