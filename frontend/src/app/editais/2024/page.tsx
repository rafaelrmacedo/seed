'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeaderHome from '@/components/HeaderHome';

export default function Editals() {
  const [pdfFiles, setPdfFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/download/2024')
      .then(response => response.json())
      .then(data => {
        setPdfFiles(data.pdfFiles)
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <HeaderHome />
      <div className="mt-8 text-center">
        <h1 className="text-2xl md:text-4xl mt-4">Editais - Seed</h1>
      </div>
      <div className="mt-8">
        {pdfFiles.map((pdf, index) => (
          <div key={index} className="mb-2">
            <Link className="text-blue-600 hover:underline"
              href={`http://localhost:3333/download/2024/${pdf}`} target='_blank'>
                {`${pdf}`}
            </Link>
          </div>
        ))}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 text-center">
        <span>
          É administrador? Faça login {}
          <Link href="/admin"
            className='text-purple-600 decoration-sky-500 hover:underline'>
              aqui
            </Link>
          {} para adicionar novos editais.
        </span>
      </div>
    </div>
  );
}