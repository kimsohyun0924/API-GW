const size = {
  mobile: '600px',
  tablet: '900px',
  laptop: '1200px',
  desktop: '1800px',
};

const theme = {
  mainColor: '#0a4297',
  primaryDark: '#0D0C1D',
  primaryLight: '#EFFFFA',
  primaryHover: '#343078',
  SecondaryLight: '#C2C7D0',
  Background: '#343a40',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
  tabletSize: 900,
  topbarSize: `60px`,
  sidebarSize: `280px`,
  sidebarSmallSize: `50px`
};

export default theme;