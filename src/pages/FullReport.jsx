import NetworkReport from '@/pages/ArchitectureReport/NetworkReport/NetworkReport';
import Report from '@/pages/CarbonReport/CarbonReport';
import InsightsReport from '@/pages/Insights/BasicInsights/BasicInsights';
import Technologies from '@/pages/Technologies/Technologies';
import TrafficAnalysis from '@/pages/TrafficAnalysis/TrafficAnalysis';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AiOutlineArrowLeft, AiOutlineDownload } from 'react-icons/ai';
import secureLocalStorage from 'react-secure-storage';
import styles from '../utils/PrivateRoute.module.scss';
import PageInsights from './Insights/PageInsights/PageInsights';
import Accessibility from './Insights/PageInsights/Sections/Accessibility/Accessibility';
import BestPractices from './Insights/PageInsights/Sections/BestPractices/BestPractices';
import SEO from './Insights/PageInsights/Sections/SEO/SEO';

const FullReport = () => {
  const websiteUrl = secureLocalStorage.getItem('websiteUrl');

  const convertToPdf = async () => {
    const pdf = new jsPDF();

    const headerText = `Green Report for ${websiteUrl}`;
    const headerFontSize = 15;
    const footerFontSize = 8;
    const footer = (pageNum, pageCount) => {
      return `Page ${pageNum} of ${pageCount}`;
    };

    const logoImage = new Image();
    logoImage.src = '/logo/greenWeb_logo_black.png'; // Replace with the path to your logo image

    logoImage.onload = async () => {
      const sampleContainer = document.querySelector('#sample');
      const components = sampleContainer.querySelectorAll('.pdf-page');

      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        const data = await html2canvas(component, {
          useCORS: true,
          allowTaint: false,
        });
        const componentWidth = component.offsetWidth;
        const componentHeight = component.offsetHeight;

        const pdfWidth = 180;
        const pdfHeight = (componentHeight * pdfWidth) / componentWidth;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.setDrawColor(27, 152, 118);
        pdf.setLineWidth(0.5);
        pdf.rect(
          5,
          5,
          pdf.internal.pageSize.getWidth() - 10,
          pdf.internal.pageSize.getHeight() - 10,
        );

        pdf.setFontSize(headerFontSize);
        const headerX = pdf.internal.pageSize.getWidth() / 2;
        const headerY = 15;
        pdf.text(headerText, headerX, headerY, { align: 'center' });

        // Add the logo image
        pdf.addImage(logoImage, 'JPEG', 15, 10, 30, 15); // Adjust position and size as needed

        const img = data.toDataURL('image/jpeg');
        pdf.addImage(img, 'JPEG', 15, 30, pdfWidth, pdfHeight);

        const pageNum = i + 1;
        const pageCount = components.length;
        pdf.setPage(pageNum);
        const footerX = pdf.internal.pageSize.getWidth() / 2;
        const footerY = pdf.internal.pageSize.getHeight() - 8;
        pdf.setFontSize(footerFontSize);
        pdf.text(footer(pageNum, pageCount), footerX, footerY, {
          align: 'center',
        });
      }

      pdf.save('green-report.pdf');
    };
  };

  return (
    <>
      <div
        className="d-flex gap-2 flex-wrap"
        style={{ justifyContent: 'flex-end' }}
      >
        <Button
          className={styles.appPrimaryButton}
          style={{ background: 'white' }}
        >
          <div className={styles.customButtonWrapper}>
            <AiOutlineArrowLeft />
            <label>Back</label>
          </div>
        </Button>
        <Button
          className={styles.appPrimaryButton}
          style={{
            background: 'var(--primary-green)',
            color: 'white',
          }}
          onClick={convertToPdf}
        >
          <div className={styles.secondaryWrapper}>
            <AiOutlineDownload />
            <label>Download Report</label>
          </div>
        </Button>
      </div>
      <div
        className="mt-4"
        id="sample"
        style={{
          padding: '25px',
          border: '1px solid #1B9876',
        }}
      >
        <div className="pdf-page">
          <Report />
        </div>
        <br /> <br />
        <div className="pdf-page">
          <NetworkReport />
        </div>
        <br /> <br />
        <div className="pdf-page">
          <InsightsReport />
        </div>
        <br /> <br />
        <div className="pdf-page">
          <TrafficAnalysis />
        </div>
        <br /> <br />
        <div className="pdf-page">
          <Technologies />
        </div>
        <div>
          <div className="mt-5 pdf-page">
            <PageInsights showTab={false} />
          </div>
          <div className="mt-5 pdf-page">
            <Accessibility />
          </div>
          <div className="mt-5 pdf-page">
            <BestPractices />
          </div>
          <div className="mt-5 pdf-page">
            <SEO />
          </div>
        </div>
      </div>
    </>
  );
};

export default FullReport;
