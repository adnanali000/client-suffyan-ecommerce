import React from 'react'
import {Container,Typography,Grid,Button} from '@material-ui/core'
import useStyles from './styles'
import CartItem from './cartItem/CartItem'
import {Link} from 'react-router-dom'
import '../products/style.css'

const Cart = ({cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
    // const isEmpty = !cart.line_items.length;
    const classes = useStyles();

    const EmptyCart = ()=>(
        <Typography variant='subtitle1'>You have no item in your shopping cart , 
        <Link to='/' className={classes.link} style={{color:'#a30f0a'}}> start adding some</Link>!
        </Typography>
    )

    const FilledCart = ()=>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={3} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} type="button" onClick={handleEmptyCart} size="large" variant="contained" color="secondary">
                            Empty Cart
                        </Button>
                        <Button component={Link} to='/checkout' className={classes.checkoutButton} type="button" size="large" variant="contained" style={{backgroundColor:'#a30f0a',color:'white'}}>
                            Checkout
                        </Button>
                    </div>
            </div>
        </>
    )

    if(!cart.line_items) return 'Loading...';

  return (
    <>
    <div className="productTop">
    <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h4" gutterBottom>Cart</Typography>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
    </div>
    </>
  )
}

export default Cart