import MenuCardItem from "../components/MenuCardItem";
import pizzaImage from '../assets/pizza.jpg';
import pepp from '../assets/pepp.jpg'
import saladImage from '../assets/salad.jpg';
import cakeImage from '../assets/cake.jpg';

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 10.99,
    image: pizzaImage,
    category: "Main",
    description: "Fresh tomatoes, mozzarella, basil, and olive oil on our signature crust"
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 7.49,
    image: saladImage,
    category: "Appetizer",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan"
  },
  {
    id: 4,
    name: "Chocolate Cake",
    price: 5.99,
    image: cakeImage,
    category: "Dessert",
    description: "Rich chocolate cake with creamy chocolate frosting"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 14.99,
    image: pepp,
    category: "Main",
    description: "Classic pepperoni with mozzarella cheese"
  }
];

const Menu = () => {
  return (
    <div style={{ padding: "20px", minHeight: "80vh" }}>
      <h1 style={{ 
        textAlign: "center", 
        marginBottom: "30px",
        color: "#1976d2",
        fontSize: "2.5rem"
      }}>
        Our Menu
      </h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {menuItems.map(item => (
          <MenuCardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;