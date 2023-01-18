import { reportWebVitals } from './vitals.service';

it('executes web vitals', () => {
  expect(reportWebVitals(console.warn)).toBeDefined();
});
