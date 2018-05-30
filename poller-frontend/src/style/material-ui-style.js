module.exports = {
  pollerTheme:{
    palette: {
      primary: {
        light: '#0A0208',
        main: '#0A0208',
        dark: '#0A0208',
        contrastText: '#fff',
      },
      secondary: {
        light: '#616161',
        main: '#616161',
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
      title:{
        fontFamily:"Play",
        fontSize: 25,
      },
      text:{
        fontFamily:"Play",
        fontSize: 15,
      },
      headline:{
        fontFamily:"Play",
        fontSize: 30,
      },
      subheading:{
        display:'inline-block',
        fontFamily:"Play",
        fontSize: 15,
      }
    },
    overrides: {
      MuiButton: { // Name of the component ⚛️ / style shee
        root: {
          container: {
            textAlign:'center',
            display: 'flex',
            flexWrap: 'wrap',
            textAlign:'center',
            margin: 20,
            
          },
          button: {
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
          },
        },
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
      }
    }
  },

  
  text:{
    fontFamily: [
      'Play',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 15,
    color:'#000'
  },
  title:{
    marginBottom:15,
    fontFamily: [
      'Play',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 35,
    color:'#000'
  },
  container_paper: theme => ({
      root: theme.mixins.gutters({
        maxWidth: 450, 
        margin: 'auto',
        marginBottom:20,
        paddingTop: 16,
        marginTop: theme.spacing.unit * 3,
      }),
    }),
    flat_button: theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      button: {
        margin: theme.spacing.unit,
        marginBottom:15,
        textAlign: 'center',
        backgroundColor: '#000',
        color:"#fff",
        borderColor: '#000',
        fontFamily: [
          'Play',
          'Roboto',
          'Arial',
          'sans-serif',
        ].join(','),
        '&:hover': {
          backgroundColor: '#808080',
        },
      },
    }),
    flat_button_2: theme => ({
      container: {
        textAlign:'center',
        display: 'flex',
        flexWrap: 'wrap',
      },
      button: {
        margin: theme.spacing.unit,
        marginBottom:15,
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
      },
    }),
    navBar:{
      navBar:{
        fontSize: 20,
        fontFamily: "Play",
        backgroundColor: '#000',
      },
      root:{
        flexGrow: 1,
      },
      flex:{
        flex:1
      },
    },
    getting_started_page: theme => ({
      root: {
        width: '90%',
      },
      paper_root: theme.mixins.gutters({
        maxWidth: 450, 
        margin: 'auto',
        marginBottom:20,
        paddingTop: 16,
        marginTop: theme.spacing.unit * 3,
      }),
      button: {
        marginRight: theme.spacing.unit,
      },
      instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
      },
    }),












    pie_hover_text:{
      fontSize: 20,
      fontFamily: "Play",
      margin:'auto',
      color:'white',
      backgroundColor:'black'
    },
    sub_title: {

    },
    appBarTitle:{
      fontSize: 40,
        fontFamily: "Play",
        margin:'auto',
        backgroundColor:'#000'
    },
    text: {
        fontSize: 20,
        fontFamily: "Play",
        margin:'auto'
    },
    legendText:{
      fontSize: 10,
      fontFamily: "Play",
    },
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
        marginLeft: 10,
        fontFamily: 'Play',
        fontSize: 20,
      },
      selectFieldWidth: {
        width: 250,
        display:'inline-block',
        margin:'auto',
        fontFamily: 'Play',
        fontSize: 20,
      },
      intro_container:{
        maxWidth: 450, 
        height:300,
        margin: 'auto',
        marginBottom:20
      },
      login_container:{
        maxWidth: 450, 
        margin: 'auto'
      },
      middle_icon: {
        display:'center',
        margin:'auto',
        width: 50,
        height: 50,
        textAlign: 'center',
        position: 'relative'
      },
      voteButtons:{
        display:'center',
        margin:'auto',
        width: '50%',
        fontSize: 20,
        fontFamily: "Play"
      },
      legendStyle:{
        maxWidth: 300,
        margin: 'auto', 
        marginBottom: 15, 
        textAlign:'center',
        position:'relative'
      },
      legendChip:{
        marginTop:5,
         marginBottom:5,  
         fontFamily:'Play', 
      position:'relative'
    },
}