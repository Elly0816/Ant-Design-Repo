import {CSSProperties, MouseEvent, ReactElement, useState} from 'react';
// import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, SxProps, Theme } from '@mui/material';
import {Link} from 'react-router-dom';



// interface Pages {
//     text: string,
//     link: string,
// }

// const pages: Pages[] = [
//     {text: "Currencies", link: "/"},
//     {text: "Favorites", link: "/favorites"}];

// const Search = styler('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'row-reverse',
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(5),
//     width: '32%',
//   },
// }));

// const SearchIconWrapper = styler('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styler(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(1)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

const appBar: SxProps<Theme> = {
  backgroundColor: "white",
  color: "black"
}

// const inputStyle: SxProps<Theme> = {
//   backgroundColor: "#c5c6d0",
//   borderRadius: "50px"
// }

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
                      <Button sx={buttonProps}>
                        <img src="./images/exchange.png" alt="exchange" />
                        <span style={{marginLeft: '5%'}}>
                          CURRENCIES
                        </span>
                     </Button>
                      </Link>                  
                      <Link style={linkProps} to='/favorites' relative='path'>                        
                      <Button sx={buttonProps}>
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