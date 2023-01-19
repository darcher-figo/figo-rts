/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable unicorn/prefer-add-event-listener */
import * as React from 'react';
import data, { title } from './data.fixture';
import worker from '../../workers';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import './style.scss';

interface ProductT {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface RequestT {
  limit: number;
  skip: number;
  products: ProductT[];
  total: number;
  loading?: boolean;
}

export const App: React.FC<{ heading?: string }> = ({ heading = title }): JSX.Element => {
  const [state, setState] = React.useState<RequestT>({
    limit: 0,
    skip: 0,
    products: [],
    total: 0,
    loading: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let webWorker: Worker | null = new Worker(worker);

  // Let's make this intentionally slow, in order to see the loading better
  // const mockTimeConsumingLoad = React.useCallback(() => {
  //   const data = new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve([
  //         { name: 'John Grayner', age: 35, id: 0 },
  //         { name: 'Mary Stones', age: 25, id: 1 },
  //         { name: 'Robert Fil', age: 27, id: 2 },
  //         { name: 'Bob Margin', age: 17, id: 3 },
  //         { name: 'Hillary Wilson', age: 53, id: 4 },
  //         { name: 'Angela Berkley', age: 44, id: 5 },
  //         { name: 'Franklin Richardson', age: 37, id: 6 },
  //       ]);
  //     }, 1000);
  //   });
  // });

  function swapLoadingTo(loading: boolean | undefined): void {
    setState(options => ({ ...options, loading }));
  }

  React.useEffect((): void => {
    swapLoadingTo(true);
  }, []);

  React.useEffect((): (() => void) => {
    if (webWorker) {
      webWorker.onmessage = (event: MessageEvent<string>) => {
        if (event.data === 'BAD') {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/unbound-method
        setState(options => ({ ...options, ...JSON.parse(event.data) }));
      };

      webWorker.onerror = () => {
        console.error('Error');
      };

      webWorker.postMessage('GET');
    }

    return (): void => {
      if (webWorker) {
        webWorker.terminate();
        // eslint-disable-next-line unicorn/no-null, react-hooks/exhaustive-deps
        webWorker = null;
        swapLoadingTo(false);
      }
    };
  }, [state.loading]);

  return (
    <>
      <h1 className="app-title">{heading}</h1>

      <div style={{ maxWidth: '100%' }}>
        <ReactDataGrid
          idProperty="id"
          columns={[
            { name: 'title', header: 'Title', minWidth: 50, defaultFlex: 2 },
            { name: 'description', header: 'Summary', maxWidth: 400, defaultFlex: 1 },
            {
              name: 'price',
              header: 'Price',
              minWidth: 50,
              defaultFlex: 2,
              type: 'number',
              render: ({ value }: { value: number }) =>
                value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            },
            {
              name: 'discountPercentage',
              header: 'Discount',
              minWidth: 50,
              defaultFlex: 1,
              type: 'number',
              render: ({ value }: { value: number }) =>
                (value / 100).toLocaleString('en', { style: 'percent' }),
            },
            {
              name: 'rating',
              header: 'Rating',
              minWidth: 50,
              defaultFlex: 1,
              type: 'number',
              render: ({ value }: { value: number }) => `${value}/5`,
            },
            { name: 'stock', header: 'Stock', minWidth: 50, defaultFlex: 1, type: 'number' },
            { name: 'brand', header: 'Brand', minWidth: 150, defaultFlex: 2 },
            { name: 'category', header: 'Category', minWidth: 150, defaultFlex: 2 },
          ]}
          dataSource={[...state.products]}
          style={{ minHeight: 550 }}
        />
      </div>
    </>
  );
};

export default App;
