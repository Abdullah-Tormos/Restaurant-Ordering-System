import { Link } from "react-router-dom";
import '../styles/Home.css';
import pizzaImage from '../assets/pizza.jpg';
import saladImage from '../assets/salad.jpg';
import cakeImage from '../assets/cake.jpg';

export default function Home() {
    const featured = [
        {
            id: 1,
            name: "Margherita Pizza",
            price: 10.99,
            image: pizzaImage,
            description: "Fresh tomatoes, mozzarella, and basil"
        },
        {
            id: 2, 
            name: "Caesar Salad",
            price: 7.49,
            image: saladImage,
            description: "Crisp romaine with Caesar dressing"
        },
        {
            id: 3,
            name: "Chocolate Cake", 
            price: 5.99,
            image: cakeImage,
            description: "Rich chocolate cake with frosting"
        }
    ];

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <h1>Welcome to TasteBite 🍽️</h1>
                    <p>
                        Fresh. Fast. Delicious. Your favorite meals delivered right to your door.
                    </p>
                    <Link to="/menu" className="hero-button">
                        Order Now
                    </Link>
                </div>
            </section>

            <section className="featured-section">
                <div className="container">
                    <h2>Featured Dishes</h2>
                    <div className="featured-grid">
                        {featured.map((item) => (
                            <div key={item.id} className="featured-card">
                                <img src={item.image} alt={item.name} />
                                <div className="featured-content">
                                    <h3>{item.name}</h3>
                                    <p className="featured-description">{item.description}</p>
                                    <p className="featured-price">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <h2>About Us</h2>
                    <p>
                        At TasteBite, we're passionate about creating flavorful dishes using 
                        fresh ingredients. Whether you're craving pizza, pasta, or dessert, 
                        we make it with love and serve it fast.
                    </p>
                </div>
            </section>
        </div>
    );
}