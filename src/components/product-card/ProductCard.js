import styles from './productCard.module.css';
import {useRef, useState} from "react";
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {updateWishlist} from "../../actions/auth";
import {useNavigate} from "react-router-dom";
import StarRating from "../../pages/rating"

const ProductCard = ({product, addProductToCart, productsPage = true}) => {

    const [addToCart, setAddToCart] = useState(false);
    const wrapperRef = useRef();
    const wishlist = useSelector(state => state.authentication.user?.wishlist) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ppage, setPpage] = useState(false);
    const [added, setAdded] = useState(false);
    const [comment, setComment] = useState("");

    const reviews = {
        1: {"comment": "I was skeptical at first, but this product has become a staple in my pantry.", "upvotes": 0, "downvotes": 0},
        2: {"comment": "My kids love this! They ask for it every time we go grocery shopping.", "upvotes": 0, "downvotes": 0},
        3: {"comment": "The packaging is great and the product inside is even better.", "upvotes": 0, "downvotes": 0},
        4: {"comment": "I tried this on a whim and I'm so glad I did. It's delicious!", "upvotes": 0, "downvotes": 0},
        5: {"comment": "I appreciate that this product is made with all-natural ingredients.", "upvotes": 0, "downvotes": 0},
        6: {"comment": "This is a great alternative to the more expensive brands.", "upvotes": 0, "downvotes": 0},
        7: {"comment": "I was pleasantly surprised by how tasty this was.", "upvotes": 0, "downvotes": 0},
        8: {"comment": "I love that this product is gluten-free and still tastes great.", "upvotes": 0, "downvotes": 0},
        9: {"comment": "The texture is perfect, not too gritty or too smooth.", "upvotes": 0, "downvotes": 0},
        10: {"comment": "This product exceeded my expectations.", "upvotes": 0, "downvotes": 0},
        11: {"comment": "I've been buying this for months now and I haven't gotten tired of it yet.", "upvotes": 0, "downvotes": 0},
        12: {"comment": "I like that this product is versatile and can be used in a variety of recipes.", "upvotes": 0, "downvotes": 0},
        13: {"comment": "I'm so glad I found this at my local grocery store. It's a game-changer.", "upvotes": 0, "downvotes": 0},
        14: {"comment": "The price is right for such a high-quality product.", "upvotes": 0, "downvotes": 0},
        15: {"comment": "I highly recommend this to anyone looking for a healthier option.", "upvotes": 0, "downvotes": 0},
        16: {"comment": "I never knew I needed this product until I tried it. Now I can't live without it.", "upvotes": 0, "downvotes": 0},
        17: {"comment": "I'm impressed with how fresh this product tastes, even though it's packaged.", "upvotes": 0, "downvotes": 0},
        18: {"comment": "I appreciate that this product is low in calories but still fills me up.", "upvotes": 0, "downvotes": 0},
        19: {"comment": "This is perfect for busy weeknights when I need a quick and easy meal.", "upvotes": 0, "downvotes": 0},
        20: {"comment": "I love that this product is environmentally friendly and comes in recyclable packaging.", "upvotes": 0, "downvotes": 0}
      };
      
      const uname = {
        1: "CoolCat123",
        2: "GreenMachine",
        3: "SunshineGirl",
        4: "PizzaLover24",
        5: "RockStar99",
        6: "Bookworm42",
        7: "AdventureMan",
        8: "FitnessFreak",
        9: "TravelBug87",
        10: "TechWhiz123",
        11: "BakingQueen",
        12: "NatureLover22",
        13: "MovieBuff56",
        14: "YogaGuru",
        15: "CoffeeAddict",
        16: "GamerGirl88",
        17: "SoccerStar21",
        18: "MusicMan",
        19: "Fashionista123",
        20: "AnimalLover98"
      };
      const num =(Math.floor(Math.random() *4 - 1 + 1) + 1)
    const togglep = () =>{setPpage(!ppage);}
    const handleWishlist = () => {
        const onError = () => {
            navigate('/login');
        }

        dispatch(updateWishlist(product.product_id, onError));
    }

    const handleAddToCart = () => {
        setAddToCart(true);

        setTimeout(() => {
            setAddToCart(false);
            addProductToCart(product);
        }, 600)
    }

    const getXi = () => {
        const elementData = wrapperRef.current.getBoundingClientRect();
        return elementData.x;
    }

    const getXf = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1024)
            return windowWidth - 11 * 16;
        return windowWidth - 5 * 16
    }
    var cc=""
    const donothing = (e) =>{
        cc=e.target.value
    }

    
    //var comment ="";
    const addComment = (e) =>{
        e.preventDefault();
        setComment(cc);
        setAdded(true);
    }
    const getYi = () => {
        const elementData = wrapperRef.current.getBoundingClientRect();
        return elementData.y;
    }

    return (
        <div  ref={wrapperRef}
             className={`${styles['wrapper']} ${productsPage ? styles['products-page'] : ''} ${!product.stock && styles['out-of-stock']}`}>
            
            {addToCart &&
                <motion.img initial={{
                    x: getXi(),
                    y: getYi(),
                    padding: '1em',
                    borderRadius: '10px'
                }}
                            animate={{
                                x: getXf(),
                                y: 0,
                                width: 24,
                                height: 24,
                                opacity: .8,
                                borderRadius: '50%',
                                padding: '.5em'
                            }}
                            transition={{type: "spring", stiffness: 40, bounce: 0}}
                            className={styles['cart-img']}
                            src={product.image}
                            alt={product.name}/>}
            <div  className={styles['image-wrapper']}>
                <img src={product.image} alt={product.name}/>
                <span onClick={handleWishlist}
                      className={`material-symbols-outlined ${styles['wishlist']} ${wishlist.includes(product.product_id) && styles['wishlisted']}`}>favorite</span>
            </div>
            <div className={styles['content']}>
                <p className={styles['name']}>{product.name}</p>
                <p className={styles['name']}>{"⭐".repeat(Math.floor(Math.random() *5 - 1 + 1) + 1)}</p>
                <div className={styles['footer']}>
                    <div className={styles['details']}>
                        <button onClick={togglep} className={styles['weight']} style={{padding: "3px"}}> Reviews </button>
                        <p className={styles['weight']}>{product.weight}{product.measurement}</p>
                        <p className={styles['price']}>{Number(product.price).toFixed(2)} USD</p>
                    </div>
                    {product.stock ?
                        <div onClick={handleAddToCart} className={styles['add-to-cart']}>Add to Cart</div> :
                        <div className={styles['unavailable']}>Out of Stock</div>}
                        {ppage ? (<div className="po" style ={    {position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    zIndex: '999'}}>
                        <h1 style={{textAlign:"center"}}>Top Reviews</h1>
                        <button
  //className="close-btn"
  onClick={togglep}
  style={{
    position: "absolute",
    top: "0",
    right: "10px",
    padding: "0.5rem",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer"
  }}
>
  X
</button>
                        <br></br>
                        {Array.from({length : 3},(_,ind) => 
                        (<p><div style ={{fontWeight: "bold"}}>{uname[Math.floor(Math.random() *20 - 1 + 1) + 1]}</div>
                        {reviews[Math.floor(Math.random() *20 - 1 + 1) + 1]["comment"]}</p>))}
                        <div style ={{fontWeight: "bold"}}>Your Review:</div>{comment}
                        
                        <div style={{ 
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px"
}}>
  <label style={{ 
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px"
  }}>Rate & Add a Comment</label>
  <div style={{margin:"5px"}}><StarRating/></div>
  <form onSubmit={addComment}>
  <textarea style={{ 
    width: "100%",
    minHeight: "100px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical"
  }}   onChange={donothing}
        placeholder="Type your comment here" ></textarea>
  <button style={{ 
    marginTop: "10px",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }}>Submit</button></form>
  
</div>
                        </div>) : null}
                         
                </div>
            </div>
        </div>
    );
}

export default ProductCard;