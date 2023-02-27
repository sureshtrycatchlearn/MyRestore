import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./basketSummary";
import BasketTable from "./basketTable";

export default function basketPage() {
const{basket} = useAppSelector(state=>state.basket);


if(!basket) return <Typography variant="h3">Your Basket is Empty</Typography>


    return(
      <>
        <BasketTable items={basket.items}/>
        <Grid container>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <BasketSummary />
            <Button
              component={Link}
              to='/checkout'
              variant="contained"
              size="large"
              fullWidth
            >
              CheckOut
            </Button>

          </Grid>
        </Grid>
      </>
    )
}