import { Paper, Container, Typography, Divider, Button } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";


export default function serverError(){

    const history = useHistory();
    const {state} = useLocation<any>();  


    return(
        <Container component={Paper}>
            {state?.error ? (
                <>
                <Typography variant="h3" color='error' gutterBottom>{state.error.title}</Typography>
                <Divider />
                <Typography>{state.error.detail || 'Internal Server Error'}</Typography>
                </>
            ):(
                <Typography variant="h5" gutterBottom>Server</Typography>
            )}
            <Button onClick={()=>history.push('/catalog')}>Go back to the store</Button>
        </Container>
    )
}