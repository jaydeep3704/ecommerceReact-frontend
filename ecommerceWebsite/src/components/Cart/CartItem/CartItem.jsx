import React,{useState} from 'react'
import "./cartitem.scss"
import prodImg from "../../../assets/products/watch-prod-2.webp"
import { MdClose } from "react-icons/md";
const CartItem = ({key,price,image,product_name,prodquantity,productPrice}) => {
  
  const [isLoading, setIsLoading] = useState(true); // Track image loading state
  const[quantity,setQuantity]=useState(prodquantity)
  const[prodprice,setprodPrice]=useState(productPrice)

  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleAdd=()=>{

    setQuantity((prev)=>prev+1)
    
  }

  const handleSubtract=()=>{
    if(quantity>1)
    {
      setQuantity((prev)=>prev-1)
      
    }
  }

   console.log(image)
   const imageSource="http://127.0.0.1:8000/"+image
  return (

    
    <div className="item-container">

        <div className="prod-img">
            <img src={imageSource}  alt={product_name} onLoad={handleImageLoad} className={isLoading ? 'hidden' : ''} />
        </div>
        <div className="prod-info">
            <div className="prod-name">{product_name}<MdClose/></div>
            <div className="quantity-buttons">
                <span onClick={handleSubtract} >-</span>
                <span>{quantity}</span>
                <span onClick={handleAdd}>+</span>
              </div>
              <div className="price">
                <span>{quantity}</span>
                <span> x </span>
                <span>{productPrice}</span>
              </div>
        </div>
    </div>
  )
}

export default CartItem
