// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarProductDetails} = props
  const {imageUrl, title, brand, price, rating} = similarProductDetails

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        className="similar-image"
        alt={`similar product ${title}`}
      />
      <h1 className="similar-title">{title}</h1>
      <p className="similar-brand">by {brand}</p>
      <div className="product-bottom-container">
        <p className="similar-title">{price}</p>
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
