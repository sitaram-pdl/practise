import { useLocation } from 'react-router-dom';
import FooterEmission from './FooterEmission';
import FooterMain from './FooterMain';

function Footer() {
  const { pathname } = useLocation();

  return pathname === '/emission-record' ? <FooterEmission /> : <FooterMain />;
}

export default Footer;
