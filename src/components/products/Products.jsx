import React from 'react'
import { Grid, Container, Typography } from '@material-ui/core'
import Product from './product/Product'
import useStyles from './styles'
import './style.css'
import {Link} from 'react-router-dom'



const Products = ({ categories, onAddToCart }) => {
  const classes = useStyles();
  return (
    <>
<div className="productTop">
    
<main className={classes.content}>
        
        
        <div className={classes.toolbar} />






        {/* <Typography style={{display:'flex', color:'#02494d',justifyContent:'center',alignItems:'center',marginTop:'30px' }} variant="h4">Our Products</Typography> */}
        {categories.map((category, index) => {
          return (
            <div
              className={classes.content}
              style={{
                // height:'100%',
                // width:'100%',
                // backgroundColor:'blue',
                // position:'absolute',
                // zIndex:'-1'
                // backgroundImage:
                //   index % 2 !== 0 ? "linear-gradient(to bottom right, #3d4a5d,#3d4a5d,#bb86fc)":" ",
              }}
            >
              <Container id={category.name}>
                <Typography style={{ paddingBottom: '20px', paddingTop: '20px', color:'#02494d' }} variant="h4" >{category.name}</Typography>
                <Grid container justifyContent='center' spacing={4}>
                  {category.productsData.map((product) => (
                    <Grid item key={product.id} xs={12} s={6} md={4} lg={3} >
                      <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>
          )
        })}
        {/* <Grid container justifyContent='center' spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} s={6} md={4} lg={3} >
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}

      </Grid> */}
      </main>
      </div>
    </>
  )
}

export default Products