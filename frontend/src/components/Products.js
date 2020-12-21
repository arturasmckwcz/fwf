import { Component } from 'react'

class Products extends Component {
  constructor() {
    super()
    // Don't call this.setState() here!
    this.state = {
      new: {
        name: '',
        list: {},
      },
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = (event) => {
    this.setState({new: {name: event.target.value}})
  }
  handleSubmit = async (event) => {
    event.preventDefault()
    await fetch('http://192.168.0.214:3001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
    this.setState({new: {name:""}})
  }
  render() {
    return (
      <div className='dummy'>
        <h3>Products</h3>
        <form onSubmit={this.handleSubmit}>
          <h3>New product</h3>
          <label htmlFor='name'>Enter product name:</label>
          <input type='text' name='name' id='name' onChange={this.handleChange} value={this.state.new.name} />
          {/* <div>{this.state.name}</div> */}
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default Products