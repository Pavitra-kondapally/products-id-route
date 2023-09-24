// Write your code here
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'

import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    quantity: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
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
      this.setState({
        productDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onIncreasingQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecreasingQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
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
              <div className="rating-button">
                <p>{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  className="star-image"
                  alt="star"
                />
              </div>
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
                className="plus-minus-btn"
              >
                <BsDashSquare className="cart-plus-minus" />
              </button>
              <p>{quantity}</p>
              <button
                data-testid="plus"
                onClick={this.onIncreasingQuantity}
                type="button"
                className="plus-minus-btn"
              >
                <BsPlusSquare className="cart-plus-minus" />
              </button>
            </div>
            <button className="add-to-cart-btn" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1>Similar Products</h1>
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

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onContinuingShopping = () => {
    this.getProductDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="failure-image"
      />
      <h1 className="failure-heading">Product Not Found</h1>
      <button
        className="continue-btn"
        type="button"
        onClick={this.onContinuingShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let content = null

    switch (apiStatus) {
      case apiStatusConstants.success:
        content = this.renderProductDetails()
        break
      case apiStatusConstants.failure:
        content = this.renderFailureView()
        break
      case apiStatusConstants.inProgress:
        content = this.renderLoaderView()
        break
      default:
        content = null
    }

    return (
      <div className="product-page-container">
        <Header />
        {content}
      </div>
    )
  }
}

export default ProductItemDetails
