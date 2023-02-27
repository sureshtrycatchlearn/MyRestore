import { Button, Grid, Link, Typography } from '@mui/material';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/basketSummary';
import BasketTable from '../basket/basketTable';


export default function Review() {
  const {basket} = useAppSelector(state=>state.basket)
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket &&
      <BasketTable items={basket.items} isBasket={false}/>}
        <Grid container>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <BasketSummary />
          </Grid>
        </Grid>
    </>
  );
}