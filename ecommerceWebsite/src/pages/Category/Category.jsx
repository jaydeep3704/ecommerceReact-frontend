import React, { useEffect, useState } from "react";
import "./category.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../features/scrollToTop";


const Category = () => {
  const navigate=useNavigate()
  const scrollRef = useScrollToTop();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1250 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [categories, setCategories] = useState([]);
  const[error,setError]=useState('')
  useEffect(() => {
    const abortController=new AbortController()
    try {
      axios
        .get("http://127.0.0.1:8000/api/categories/",{
          signal:abortController.signal
        })
        .then((response) => setCategories(response.data));
    } catch (error) {
      setError(error)
    }
    
    return ()=>abortController.abort()

  }, []);


  const handleClick=(category_name)=>{
    navigate(`/category/${category_name}`)
    scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });

  }

  return (
    <>
      <div className="category-container">
        <Carousel
          responsive={responsive}
          swipeable={false}
          itemClass="carousel-item-padding-40-px"
          
        >
         { 
          categories.map((element)=>
          {
            return <div className="category" key={element.id} onClick={()=>handleClick(element.slug)} >
              <img src={element.category_img} alt="" />
            </div>
          }
          )
        }
        </Carousel>
      </div>
    </>
  );
};

export default Category;
