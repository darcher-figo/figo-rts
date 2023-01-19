import * as React from 'react';
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
  worker?: Worker;
}

export const App: React.FC = (): JSX.Element => {
  const [state, setState] = React.useState<RequestT>({
    limit: 0,
    skip: 0,
    products: [],
    total: 0,
    loading: false,
  });

  function swapLoadingTo(loading: boolean | undefined): void {
    setState(options => ({ ...options, loading }));
  }

  React.useEffect((): void => {
    swapLoadingTo(true);

    setState(options => ({ ...options, worker: new Worker(worker) }));
  }, []);

  React.useEffect((): (() => void) => {
    if (state.worker) {
      state.worker.addEventListener('message', (event: MessageEvent<string>) => {
        if (event.data === 'BAD') {
          return;
        }

        const update = JSON.parse(event.data) as RequestT;

        setState(options => ({ ...options, ...update }));
      });

      state.worker.addEventListener('errormessage', () => {
        console.error('Error');
      });

      state.worker.postMessage('GET');
    }

    return (): void => {
      if (state.worker) {
        state.worker.terminate();
        setState(options => {
          delete options.worker;
          return options;
        });
        swapLoadingTo(false);
      }
    };
  }, [state.loading, state.worker]);

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
