import React from 'react'
import './FeedsTopMiddle.css'
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import { Search } from '@material-ui/icons';


const text = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiInput:{
            underline:{

                '&::before':{
                    border:0,
                },
                '&::after':{
                    border:0,
                },
            },
        },
        MuiInputBase: {
        // Name of the rule
            root:{
                width:'100%',
                height: '100%',
                // '&:hover':{
                //     border:0,
                // },
            },
            input: {
                // Some CSS
                borderRadius: 20,
                border: 0,
                width:'100%',
                height: '100%',
                boxShadow: '#E7E6E6',
                variant:"contained",
            },
        },
    },
});

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//         width:'100%',
//         height:'100%',
//         backgroundColor: '#E7E6E6',
//         borderRadius: '1rem',
//         '& MuiOutlinedInput-root ':{
//             backgroundColor:'red',
//         },
//       },
//     },
//   }));



function FeedsTopMiddle() {
    // const classes = useStyles();
    const icon = <Search />;
    return (
        <div className='FeedsTopMiddleBox'>
            {/* <ThemeProvider theme={theme}>
                <Button>Overrides CSS</Button>
            </ThemeProvider> */}


            <div className='FeedsTopMiddle'>
                <ThemeProvider theme={text}>
                    <TextField variant='outlined' style={{width:'100%', height:'100%'}} 
                    InputProps={{
                        endAdornment: icon
                      }}/>
                </ThemeProvider>
            </div>




            {/* <ThemeProvider theme={texts}>
                <TextField id="time" type="time" inputProps={inputProps} />;
            </ThemeProvider> */}
        </div>
    )
};

export default FeedsTopMiddle;