import React from 'react';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan='2'>
          {category}
        </th>
      </tr>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name :
      <span style={{color:'red'}}>
        {product.name}
      </span>
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    this.props.products.forEach((product) => {
      if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
          category={product.category}
          key={product.category}/>
        );
      }
      rows.push(
        <ProductRow
        product={product}
        key={product.name}/>
      );
      lastCategory = product.category;
    });
      return (
        <table>
         <thead>
           <tr>
             <th>Name</th>
             <th>Price</th>
           </tr>
         </thead>
         <tbody>{rows}</tbody>
       </table>
      )
  }
}

class SearchBar extends React.Component {
  handleTextChange = (e) => {
    this.props.handleFilterText(e.target.value)
  }
  handleInputChecked = (e) => {
    this.props.handleInStockOnlyChange(e.target.checked)
  }
  render() {
    const {filterText, inStockOnly} = this.props;
    return (
      <form>
        <input
          type='text'
          placeholder='Search'
          value={filterText}
          onChange={this.handleTextChange}/>
        <p>
          <input type='checkbox'
            checked={inStockOnly}
            onChange={this.handleInputChecked}/>
          show only items in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
  }
  handleFilterText = (filterText) => {
    this.setState({
      filterText
    })
  }
  handleInStockOnlyChange = (inStockOnly) => {
    this.setState({
      inStockOnly
    })
  }
  render() {
    return (
      <div>
        <SearchBar
          onTextChange={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleFilterText={this.handleFilterText}
          handleInStockOnlyChange={this.handleInStockOnlyChange}
          />
        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={PRODUCTS}
        />
      </div>
    )
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

export default FilterableProductTable;
