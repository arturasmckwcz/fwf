import { Component } from 'react';
import List from '../common/List';
import '../common/common.css';
import { PRODUCTS_URL } from '../lib/constants';
import { getList } from '../lib/apiCalls';

const emptyProduct = { id: null, name: '' };

class Products extends Component {
  state = {
    product: emptyProduct,
    list: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      product: { ...this.state.product, [name]: value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({ ...prevState, product: emptyProduct }));
  };

  handleClick = (id) => {
    let product = this.state.list.find((item) => id === item.id);
    // empty values may come as null, but we need "" for tag input value=
    for (let key in product) {
      if (product[key] === null) {
        product[key] = '';
      }
    }
    this.setState({ ...this.state, product });
  };

  async componentDidMount() {
    const list = await getList(PRODUCTS_URL);
    this.setState((prevState) => ({ ...prevState, list }));
  }

  clearForm = () => {
    this.setState({ ...this.state, product: emptyProduct });
  };

  render() {
    return (
      <div className="dummy">
        <h3>Products</h3>
        <button onClick={this.clearForm}>Clear form</button>
        <form
          style={{
            display: 'grid',
            gridTemplateColumns: '150px 150px 150px',
            columnGap: '10px',
          }}
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.product.name}
          />
          <button type="submit">
            {this.state.product.id === null ? 'Add new' : 'Save'}
          </button>
        </form>
        {this.state.list.length !== 0 ? (
          <List handleClick={this.handleClick} list={this.state.list} />
        ) : (
          <div>There's nothing to display!</div>
        )}
      </div>
    );
  }
}

export default Products;
