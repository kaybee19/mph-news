import { createTheme } from '@material-ui/core/styles';

export default const theme = createTheme({
  spreadThis: {
    hrTop: {
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      marginBottom: 12.5,
      borderColor: 'rgba(0,0,0,.15)'
    },
    logoClass: {
      width: '175px',
      height: 'auto'
    },
    linkClass: {
      color: 'inherit',
      textDecoration: 'none'
    },
    hrHome: {
      marginTop: '2.5rem',
      width: '100%'
    },
    newsHr: {
      borderBottom: 'none',
      borderRight: 'none',
      borderLeft: 'none'
    }
  }
}