import { CLSReportCallback, ReportCallback } from 'web-vitals';

export const reportWebVitals = async <T = ReportCallback | CLSReportCallback>(
  onPerfEntry?: T,
): Promise<void> => {
  const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');
  onCLS(onPerfEntry as CLSReportCallback);

  const ope = onPerfEntry as ReportCallback;
  onCLS(ope);
  onFID(ope);
  onFCP(ope);
  onLCP(ope);
  onTTFB(ope);
};

export default reportWebVitals;
