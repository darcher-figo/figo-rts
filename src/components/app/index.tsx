import * as React from 'react';
import { title } from './data.fixture';
import worker from '../../workers';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/base.css';
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

export const App: React.FC = (): JSX.Element => {
  const [state, setState] = React.useState<RequestT>({
    limit: 0,
    skip: 0,
    products: [],
    total: 0,
    loading: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let webWorker: Worker | null = new Worker(worker);

  function swapLoadingTo(loading: boolean | undefined): void {
    setState(options => ({ ...options, loading }));
  }

  React.useEffect((): void => {
    swapLoadingTo(true);
  }, []);

  React.useEffect((): (() => void) => {
    if (webWorker) {
      // eslint-disable-next-line unicorn/prefer-add-event-listener, react-hooks/rules-of-hooks
      webWorker.onmessage = (event: MessageEvent<string>) => {
        if (event.data === 'BAD') {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/unbound-method
        setState(options => ({ ...options, ...JSON.parse(event.data) }));
      };

      // eslint-disable-next-line unicorn/prefer-add-event-listener
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
      <h1 className="app-title">
        Figo<span className="title-abbr">RTS</span>
      </h1>

      <div style={{ maxWidth: '100%' }}>
        <ReactDataGrid
          idProperty="id"
          columns={[
            { name: 'title', header: 'Title', minWidth: 50, defaultFlex: 1.5 },
            {
              name: 'description',
              header: 'Summary',
              defaultFlex: 3,
              minWidth: 480,
              maxWidth: 640,
            },
            {
              name: 'price',
              header: 'Price',
              minWidth: 50,
              defaultFlex: 1,
              type: 'number',
              render: ({ value }: { value: number }) =>
                value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            },
            {
              name: 'discountPercentage',
              header: 'Discount',
              minWidth: 50,
              defaultFlex: 0.75,
              type: 'number',
              render: ({ value }: { value: number }) =>
                (value / 100).toLocaleString('en', { style: 'percent' }),
            },
            {
              name: 'rating',
              header: 'Rating',
              minWidth: 50,
              defaultFlex: 0.75,
              type: 'number',
              render: ({ value }: { value: number }) => `${value}/5`,
            },
            { name: 'stock', header: 'Stock', minWidth: 50, defaultFlex: 0.75, type: 'number' },
            { name: 'brand', header: 'Brand', minWidth: 150, defaultFlex: 1 },
            { name: 'category', header: 'Category', minWidth: 150, defaultFlex: 1 },
          ]}
          theme={'default-light'}
          dataSource={[...state.products]}
          style={{ minHeight: 800 }}
          minRowHeight={36}
          rowHeight={48}
          enableColumnAutosize={true}
          pageSizes={[25, 50, 100, 250, 500, 1000]}
        />
      </div>
    </>
  );
};

export default App;
