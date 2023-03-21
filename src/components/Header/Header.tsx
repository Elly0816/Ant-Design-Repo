import {CSSProperties, MouseEvent, ReactElement, useState, useContext} from 'react';
// import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, SxProps, Theme } from '@mui/material';
import {Link} from 'react-router-dom';
import { appContext } from '../../App';




const appBar: SxProps<Theme> = {
  backgroundColor: "white",
  color: "black"
}


const mainStyling: SxProps<Theme> = {
  width: "100vw"
}

const buttonProps: SxProps<Theme> = { 
                                      my: 2, 
                                      color: 'black',
                                      display: 'flex',
                                      ":active":{
                                      backgroundColor: "gray"
                                      }, 
                                      ":hover": {
                                      backgroundColor: "gray",
                                      color: "white"},
                                      margin: '2%',
                                      };

const buttonBoxProps: SxProps<Theme> = {flexGrow: 1,
  display: { xs: 'flex', md: 'flex' },
  justifyContent: ['space between'],
  marginLeft: '20%',
  paddingLeft: {md: '20px'},
  fontWeight: 'bolder',
}

const linkProps: CSSProperties = {
                                  color: 'inherit',
                                  marginLeft: '2%',
                                  marginRight: '2%'
                                };



export default function PrimarySearchAppBar(): ReactElement {

  const {view, setView, getFavData} : {view: 'currencies' | 'favorites',
   setView: React.Dispatch<React.SetStateAction<"currencies" | "favorites">>,
  getFavData: () => void} = useContext(appContext);



  return (
                <Box sx={mainStyling}>
            <AppBar sx={appBar} position="relative">
                <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' }}}
                >
                    Currency Rates
                </Typography>
                <Box sx={buttonBoxProps}>
                      <Link style={linkProps} to='/' relative='path'>                        
                      <Button sx={buttonProps} onClick={() => {
                        if (view !== 'currencies'){
                          setView('currencies');
                        }
                      }}>
                        <img src="./images/exchange.png" alt="exchange" />
                        <span style={{marginLeft: '5%'}}>
                          CURRENCIES
                        </span>
                     </Button>
                      </Link>                  
                      <Link style={linkProps} to='/favorites' relative='path'>                        
                      <Button sx={buttonProps} onClick={() => {
                        if (view !== 'favorites'){
                          setView('favorites')
                          getFavData();
                        }
                      }}>
                        <img src="./images/red-heart.png" alt="red-heart" />
                        <span style={{marginLeft: '5%'}}>
                          FAVORITES
                        </span>
                     </Button>
                      </Link>                  

                </Box>
                {/* <Search>
                    <SearchIconWrapper>
                    <SearchIcon sx={{zIndex: 1}}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                    sx={inputStyle}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search> */}
                </Toolbar>
            </AppBar>

            </Box>    
  );
}