import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PDFViewer from 'pdf-viewer-reactjs'
import FileViewer from 'react-file-viewer';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import Pdf from '@mikecousins/react-pdf';
import { Document, Page } from 'react-pdf';

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
  return (
    /*  <Viewer fileUrl='https://arxiv.org/pdf/quant-ph/0410100.pdf' /> */
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
      <div style={{ height: '750px' }}>
        <Viewer fileUrl="https://arxiv.org/pdf/quant-ph/0410100.pdf" />
      </div>
    </Worker>
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
        <Route exact path="/mikecousins/react-pdf" component={ReactPdf} />
      </Switch>
    </Router>
  );
}

export default App;
