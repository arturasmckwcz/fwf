import {Component, Link} from 'react'
import './TopBar.css'

class TopBar extends Component {
  render() {
    return (
      <section id="nav-bar">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <Link
                    activeClass="active"
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="demo"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="process"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    Process
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}



// class TopBar extends Component {
//   render() {
//     return (<div className='TopBar'>
//       <h3>[FWF]</h3>
//       <div className='link'><h5>Insert production</h5></div>
//       <div className='link'><h5>Insert prescription</h5></div>
//       <div className='link'><h5>Insert blood</h5></div>
//       <div className='link'><h5>Generate production</h5></div>
//     </div>)
//   }
// }

export default TopBar