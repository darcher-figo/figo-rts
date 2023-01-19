import * as React from 'react';
import worker from '../../workers/table.worker';
import './style.scss';

interface PhotoT {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface GalleryT {
  albumId: number;
  album: PhotoT[];
  loading?: boolean;
  worker?: Worker;
}

export const App: React.FunctionComponent = (): JSX.Element => {
  const [state, setState] = React.useState<Partial<GalleryT>>({
    albumId: 0,
    album: [],
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

        const update = JSON.parse(event.data) as PhotoT;

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

  const albumReference = state?.albumId?.toString() || '0';

  return (
    <>
      <h1 className="app-title">
        Figo<span className="title-abbr">RTS</span>
      </h1>

      <div style={{ maxWidth: '100%' }}>
        <figure
          role="group"
          aria-labelledby={albumReference}
        >
          <figcaption id={albumReference}>
            The castle through the ages: 1423, 1756, and 1936 respectively.
          </figcaption>

          {(state?.album || []).map(({ id, title, url, thumbnailUrl }): JSX.Element => {
            const imgReference = id.toString();

            return (
              <a
                href={url}
                title={title}
              >
                <figure
                  role="group"
                  key={imgReference}
                  aria-labelledby={imgReference}
                >
                  <img
                    src={thumbnailUrl}
                    alt={title}
                  />
                  <figcaption id={imgReference}>{title}</figcaption>
                </figure>
              </a>
            );
          })}
        </figure>
      </div>
    </>
  );
};

export default App;
