// import ReactDOMServer from 'react-dom/server'
import {pipeToNodeWritable} from 'react-dom/unstable-fizz.node'
import { StaticRouter } from 'react-router-dom'
import { App } from './App/App'

export async function render(url, res) {
  
  // This render function doesnt work properly yet,
  //TODO Fix this Function so the pipeNode works properly.
    res.socket.on('error', error => {
      console.error('Fatal', error);
    });
    let data = {}
    let didError = false;
    const {startWriting, abort} = pipeToNodeWritable(
      <App />,
      res,
      {
        
        onReadyToStream() {
          // If something erred before we started streaming, we set the error code appropriately.
          res.statusCode = didError ? 500 : 200;
          res.setHeader('Content-type', 'text/html');
          res.write('<!DOCTYPE html>');
          startWriting();
        },
        onError(x) {
          didError = true;
          console.error(x);
        },
      }
    );
    // Abandon and switch to client rendering if enough time passes.
    // Try lowering this to see the client recover.
    setTimeout(abort, 10000);
  };
  