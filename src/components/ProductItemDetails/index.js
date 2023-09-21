// Write your code here
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {productDetails: {}, isLoading: true, quantity: 1}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/products/${id}`)
    const data = await response.json()

    const updatedData = {
      imageUrl: data.image_url,
      title: data.title,
      price: data.price,
      description: data.description,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
      similarProducts: data.similar_products,
    }
    this.setState({productDetails: updatedData, isLoading: false})
  }

  onIncreasingQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecreasingQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  renderProductDetails = () => {
    const {productDetails, quantity} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productDetails

    return (
      <div className="details-container">
        <div className="product-container">
          <img src={imageUrl} className="product-image" alt="product" />
          <div className="product-text-container">
            <h1 className="product-title">{title}</h1>
            <p className="product-price">{price}</p>
            <div className="rating-container">
              <button className="rating-button" type="button">
                {rating}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  className="star-image"
                  alt="star"
                />
              </button>
              <p className="reviews-text">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <p className="product-det">
              Available: <span className="product-info">{availability}</span>
            </p>
            <p className="product-det">
              Brand: <span className="product-info">{brand}</span>
            </p>
            <hr className="horizontal-line" />
            <div className="cart-items-container">
              <button
                data-testid="minus"
                onClick={this.onDecreasingQuantity}
                type="button"
              >
                <BsDashSquare />
              </button>
              <p>{quantity}</p>
              <button
                data-testid="plus"
                onClick={this.onIncreasingQuantity}
                type="button"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-to-cart-btn" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <ul className="similar-products-list">
          {similarProducts.map(eachProduct => (
            <SimilarProductItem
              similarProductDetails={eachProduct}
              key={eachProduct.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="product-page-container">
        <Header />
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        ) : (
          this.renderProductDetails()
        )}
      </div>
    )
  }
}

export default ProductItemDetails
