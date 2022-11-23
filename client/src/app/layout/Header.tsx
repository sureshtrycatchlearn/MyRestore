import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props{
    darkMode: boolean;
    handeleThemeChange:()=>void;
}

export default function Header({darkMode, handeleThemeChange}:Props){
    return (
        <AppBar position = 'static' sx={{mb:4}}>
            <Toolbar>
                <Typography variant='h6'>
                    RESTORE
                </Typography>
                <Switch checked={darkMode} onChange={handeleThemeChange}/>
            </Toolbar>
        </AppBar>
    )
}