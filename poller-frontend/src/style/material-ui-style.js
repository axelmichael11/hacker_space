const primaryColor = '#0A0208'
const secondaryColor = '#fff'
const appFonts = [
  'Play',
  'Roboto',
  'Arial',
  'sans-serif',
].join(',')

module.exports = {
  pollerTheme:{
    palette: {
      primary: {
        light: '#0A0208',
        main: primaryColor,
        dark: '#0A0208',
        contrastText: '#fff',
      },
      secondary: {
        light: '#616161',
        main: secondaryColor,
        dark: '#616161',
        contrastText: '#000',
      }
    },
    typography:{
      fontFamily: [
        'Play',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
      text:{
        fontFamily:"Play",
        fontSize: 15,
      },
      headline:{
        fontFamily:"Play",
        fontSize: 30,
        textAlign:'center'
      },
      display2:{
        fontFamily:"Play",
        // fontSize: 30,
        textAlign:'center'
      },
      subheading:{
        // margin:'auto',
        display:'block',
        fontFamily:"Play",
        // textAlign: 'center'
      },

      title:{
        color:secondaryColor,
        backgroundColor: primaryColor,
        // margin:'auto',
      },
      
      display1:{
        color:secondaryColor,
        backgroundColor: primaryColor,
      },

      display3:{
        fontFamily: [
          'Play',
          'Roboto',
          'Arial',
          'sans-serif',
        ].join(','),
        margin:'auto'
      }

    },
    overrides: {
      MuiCardMenu:{
        height: 65
      },

      MuiMenuItem: {
        backgroundColor: secondaryColor,
        color:primaryColor,
        display:'inline',
        fontFamily: [
          'Play',
          'Roboto',
          'Arial',
          'sans-serif',
        ].join(','),
      },

      MuiButton: { 
        textAlign:'center',
            margin:15,
            textAlign: 'center',
            backgroundColor: secondaryColor,
            color:primaryColor,
            fontFamily: [
              'Play',
              'Roboto',
              'Arial',
              'sans-serif',
            ].join(','),
            '&:hover': {
              backgroundColor: '#000',
              color:'#fff'
            },
            margin:'auto',
            display: 'flex',
            flexWrap: 'wrap',
            textAlign:'center',
            container:{
              margin:'auto',
              display: 'flex',
              flexWrap: 'wrap',
              textAlign:'center',
              margin:20
            }
      },
      MuiMenu:{
        borderColor: primaryColor,
      },
      MuiListItem:{
        // backgroundColor: theme.palette.primary.main,
        // color:theme.palette.secondary.main,
        title: { width:'50%'},
        container:{
          width: '50%',
          maxWidth: 500,
        },
        border: '1px black solid',
      },
      MuiSelectField: {
        width: 250,
        display:'inline-block',
        margin:'auto'
      },
      MuiCheckbox: {
      },
      MuiPaper:{
        root:{
          maxWidth: 600, 
          margin: 'auto',
          marginBottom:20,
          flexGrow: 1
        }
      },
      MuiAppBar:{
        fontSize: 20,
        fontFamily: "Play",
        backgroundColor: '#000',
      },
      PollCard:{
        cardHeader:{
          textAlign:'center',
          fontFamily: appFonts,
          color: secondaryColor,
          backgroundColor: primaryColor,
        },
        pollActions:{
          backgroundColor: primaryColor,
          color: secondaryColor
        },
        cardContent:{
          root:{
            fontFamily:appFonts,
            backgroundColor: primaryColor,
          },
          // textAlign:'center',
          margin:0,
        },
      },
      MuiCheckbox: {
        color: primaryColor,
        backgroundColor: secondaryColor,
        marginBottom: 16,
        marginLeft: 10,
        fontFamily: 'Play',
        fontSize: 20,
      },

      MuiIcon:{
        root:{
        },
        colorPrimary: secondaryColor,
      },


      MuiCardActions:{
       root:{
        maxWidth: 600, 
        margin: 'auto',
        flexGrow: 1,
        backgroundColor:primaryColor,
        color:secondaryColor,
        }
      },
      MuiCollapse:{
        root:{
            backgroundColor:secondaryColor,
            color:primaryColor,
          },
        container:{
          maxWidth: 600, 
          margin: 'auto',
          // marginBottom:20,
          flexGrow: 1,
          // margin:5
        },
        wrapperInner:{
          display:"inline-block"
        }
      }
    },

    uniqueStyles:{
      MuiVoteButton:{ 
        textAlign:'center',
            margin:15,
            textAlign: 'center',
            backgroundColor: '#fff',
            color:"#000",
            fontFamily: [
              'Play',
              'Roboto',
              'Arial',
              'sans-serif',
            ].join(','),
            '&:hover': {
              backgroundColor: '#000',
              color:'#fff'
            },
            margin:'auto',
            // display: 'flex',
            width:'50%',
            flexWrap: 'wrap',
            textAlign:'center',
            container:{
              margin:'auto',
              display: 'flex',
              flexWrap: 'wrap',
              textAlign:'center',
              margin:20
            }
          },
          dialogStretchedButtons:{
            root:{
              display:'block',
            }
          },
          pie_hover_text:{
            fontSize: 20,
            fontFamily: "Play",
            margin:'auto',
            color:'white',
            backgroundColor:'black'
          },
    },
  },
    pie_hover_text:{
      fontSize: 20,
      fontFamily: "Play",
      margin:'auto',
      color:'white',
      backgroundColor:'black'
    },
    legendText:{
      fontSize: 10,
      fontFamily: "Play",
    },
      block: {
        maxWidth: 250,
      },
}