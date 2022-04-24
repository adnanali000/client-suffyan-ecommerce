import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography, MenuItem, Menu } from '@material-ui/core'
import { ShoppingCart, ArrowBack } from '@material-ui/icons'
import logo from '../../assests/hub.jpg'
import useStyles from './styles'
import { Link, useLocation,useNavigate } from 'react-router-dom'

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <header className="text-white body-font fixed w-full z-10 top-0" style={{backgroundColor:'#a30f0a'}}>
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg> */}
                        <img src={logo} alt='e-commerce' className="text-white rounded-full" style={{width:'50px',height:'50px'}} />
                        <span className="ml-3 text-xl text-white">Project Name</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        {/* <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
                        <Link to="/about" className="mr-5 hover:text-gray-900">About Us</Link>
                        <Link to="/contact" className="mr-5 hover:text-gray-900">Contact us</Link> */}
                    </nav>
                    {
                     location.pathname === '/' ? (   
                         <Link to="/cart">
                    <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0">
                         <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>

                    </button>
                    </Link>
                    ):(<button onClick={() => navigate(-1)}>go back</button>)
                    }
                </div>
            </header>
            {/* <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='e-commerce' height='25px' className={classes.image} />
                        Accessories-Store
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' ? (
                        <div className={classes.button}>
                            <IconButton component={Link} to='/cart' aria-label='Show card items' color='inherit'>
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    ): <Link to='/'><ArrowBack /></Link>}
                </Toolbar>
            </AppBar> */}

        </>
    )
}

export default Navbar