import React, {useState } from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import LoginDialog from './loginDialog';
const MainHeader = () => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleLogin = () => {
        setOpenDialog(true)
    }
    const handleClose = () => {
        setOpenDialog(false)
    }
   
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Speech to Text
                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                </Toolbar>
            </AppBar>
            <LoginDialog 
            openDialog={openDialog}
            dialogClose={handleClose}/>
           
            
        </Box>
    )
}

export default MainHeader