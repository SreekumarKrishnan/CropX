import React from 'react';

const CertificateModal = ({ certificate, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-3xl mx-auto p-4 bg-white rounded-md overflow-hidden">
        <img src={certificate} alt="Certificate" className="w-full h-auto" />
        <button
          className="absolute top-2 right-2 text-white cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CertificateModal;