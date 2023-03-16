import {MouseEvent, ReactElement, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, SxProps, Theme } from '@mui/material';



interface Pages {
    text: string,
    link: string,
}

const pages: Pages[] = [{text: "Deals", link: "/"},
    {text: "New!", link: "/"},
    {text: "Delivery", link: "/"}];

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(5),
    width: '32%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const appBar: SxProps<Theme> = {
  backgroundColor: "white",
  color: "black"
}

const inputStyle: SxProps<Theme> = {
  backgroundColor: "#c5c6d0",
  borderRadius: "50px"
}

const mainStyling: SxProps<Theme> = {
  width: "100vw"
}

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
                    Live Stocks
                </Typography>
                <Box sx={{flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            paddingLeft: {md: '20px'}}}>
                    {pages.map((page, index) => (
                    <Button
                        key={index}
                        sx={{ my: 2, color: 'black', display: 'block', ":active":{backgroundColor: "gray"} }}
                        onClick={() => {}}
                    >
                        {page.text}
                    </Button>
                    ))}
                </Box>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon sx={{zIndex: 1}}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                    sx={inputStyle}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                </Toolbar>
            </AppBar>

            </Box>    
  );
}