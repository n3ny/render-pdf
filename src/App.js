import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PDFViewer from 'pdf-viewer-reactjs'
import FileViewer from 'react-file-viewer';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import Pdf from '@mikecousins/react-pdf';
import { Document, Page } from 'react-pdf';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import the styles
import '@react-pdf-viewer/core/styles/index.css';
import '@react-pdf-viewer/default-layout/styles/index.css';

import './App.css';

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <h4>Ejemplos de diferentes librería para mostrar PDF</h4>
    </div>
  )
}

const PdfViewerReactjs = () => {
  return (
    <PDFViewer
      document={{
        url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
      }}
    />
  )
}

const MgrPdfViewerReact = () => {
  return (
    <PDFViewer document={{
      url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
    }} />
  );
}

const ReactFileViewer = () => {
  return (
    <FileViewer
      fileType='pdf'
      filePath={'https://arxiv.org/pdf/quant-ph/0410100.pdf'} />
  );
}

const ReactPdfViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker
      workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js"
    >      <div style={{ height: '750px' }}>
        <Viewer
          fileUrl="https://arxiv.org/pdf/quant-ph/0410100.pdf"
          plugins={[
            defaultLayoutPluginInstance,
          ]}
        />
      </div>
    </Worker>
  );
}

const ReactPdfViewerCustom = () => {

  const renderToolbar = (Toolbar) => (
    <Toolbar>
      {
        (slots) => {
          const {
            CurrentPageInput, Download, EnterFullScreen, GoToNextPage, GoToPreviousPage,
            NumberOfPages, Print, ShowSearchPopover, Zoom, ZoomIn,
            ZoomOut,
          } = slots;
          return (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <div style={{ padding: '0px 2px' }}>
                <ShowSearchPopover />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <ZoomOut />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <Zoom />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <ZoomIn />
              </div>
              <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                <GoToPreviousPage />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <CurrentPageInput /> / <NumberOfPages />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <GoToNextPage />
              </div>
              <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                <EnterFullScreen />
              </div>
{/*               <div style={{ padding: '0px 2px' }}>
                <Download />
              </div> */}
{/*               <div style={{ padding: '0px 2px' }}>
                <Print />
              </div> */}
            </div>
          )
        }
      }
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  return (
    <div style={{ height: '750px' }}>
      <Worker
        workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js"
      >
        <Viewer
          fileUrl='https://arxiv.org/pdf/quant-ph/0410100.pdf'
          plugins={[
            defaultLayoutPluginInstance,
          ]}
        />
      </Worker>
    </div>
  );
}

const MikecousinsReactPdf = () => {
  return <p>Not working for me :(</p>
  /* const [page, setPage] = useState(1);
 
  return <Pdf file="https://arxiv.org/pdf/quant-ph/0410100.pdf" page={page} />; */
};

const ReactPdf = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(2);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="https://arxiv.org/pdf/quant-ph/0410100.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pdf-viewer-reactjs">Render with - pdf-viewer-reactjs</Link>
          </li>
          <li>
            <Link to="/mgr-pdf-viewer-react">Render with - mgr-pdf-viewer-react</Link>
          </li>
          <li>
            <Link to="/react-file-viewer">Render with - react-file-viewer</Link>
          </li>
          <li>
            <Link to="/phuocng/react-pdf-viewer">Render with - react-pdf-viewer</Link>
          </li>
          <li>
            <Link to="/phuocng/react-pdf-viewer-custom">Render custom with - react-pdf-viewer</Link>
          </li>
          <li>
            <Link to="/mikecousins/react-pdf">Render with - react-pdf</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pdf-viewer-reactjs" component={PdfViewerReactjs} />
        <Route exact path="/mgr-pdf-viewer-react" component={MgrPdfViewerReact} />
        <Route exact path="/react-file-viewer" component={ReactFileViewer} />
        <Route exact path="/phuocng/react-pdf-viewer" component={ReactPdfViewer} />
        <Route exact path="/phuocng/react-pdf-viewer-custom" component={ReactPdfViewerCustom} />
        <Route exact path="/mikecousins/react-pdf" component={ReactPdf} />
      </Switch>
    </Router>
  );
}

export default App;
