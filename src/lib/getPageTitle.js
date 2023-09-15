export const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/hardwarereport':
      return 'Hardware and Software Report';
    case '/basic-insights':
      return 'Basic Insights';
    case '/carbontest':
      return 'Carbon test';
    case '/tabledata':
      return 'Table Data';
    case '/technologies':
      return 'Technology';
    case '/settings':
      return 'Settings';
    case '/networkreport':
      return 'Network Report';
    case '/accessibility':
      return 'Accessibility';
    case '/page-insights':
      return 'Page Insights';
    case '/bestpractices':
      return 'Best Practicse';
    case '/trafficanalysis':
      return 'Traffic Analysis';
    case '/seo':
      return 'SEO';
    default:
      return '';
  }
};
