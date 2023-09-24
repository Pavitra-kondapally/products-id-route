// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarProductDetails} = props
  const {image_url, title, brand, price, rating} = similarProductDetails

  return (
    <li className="similar-product-item">
      <img
        src={image_url}
        className="similar-image"
        alt={`similar product ${title}`}
      />
      <p className="similar-title">{title}</p>
      <p className="similar-brand">by {brand}</p>
      <div className="product-bottom-container">
        <p className="similar-title">Rs {price}/-</p>
        <button className="rating-btn" type="button">
          {rating}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-img"
          />
        </button>
      </div>
    </li>
  )
}

export default SimilarProductItem
