import { Link } from 'react-router-dom'
import { useState } from 'react' 
import ReOrderIcon from '@mui/icons-material/Reorder'
import '../styles/Navbar.css'

const Navbar = () => {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

    return(
        <div className='navbar'>
            <div className='leftSide'>
                <Link to="/" className="logo-link">
                    <h2>TasteBite</h2>
                </Link>
            </div>
            
            <div className='rightSide'>
                <Link to="/"> Home </Link>
                <Link to="/menu"> Menu </Link>
                <Link to="/cart"> Cart </Link>
                <button onClick={toggleNavbar} className="menu-button">
                    <ReOrderIcon/>
                </button>
            </div>

            <div className='hiddenLinks' id={openLinks ? "open" : "close"}>
                <Link to="/" onClick={() => setOpenLinks(false)}> Home </Link>
                <Link to="/menu" onClick={() => setOpenLinks(false)}> Menu </Link>
                <Link to="/cart" onClick={() => setOpenLinks(false)}> Cart </Link>
            </div> 
        </div>
    )
}

export default Navbar;