import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import agent from "../../app/api/agent";

export default  function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.testErrors.getValidationError()
             .then(()=> console.log('should not use'))
             .catch(error=>setValidationErrors(error));
    }

    return  (
        <Container>
            <Typography gutterBottom variant='h2'>Error for testing purpouse</Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={()=> agent.testErrors.get400Error().catch(error=>console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={()=> agent.testErrors.get401Error().catch(error=>console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={()=> agent.testErrors.get404Error().catch(error=>console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={()=> agent.testErrors.get500Error().catch(error=>console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length> 0 && 
                <Alert security="error">
                    <AlertTitle>Validation Error</AlertTitle>
                    <List>{validationErrors.map(error=>(
                        <ListItem key={error}>
                        <ListItemText>{error}</ListItemText>    
                        </ListItem>
                    ))}</List>
                </Alert>
            } 
        </Container>
    )
}