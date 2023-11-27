'use client'

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import Cookie from 'cookies-ts';
import Image from 'next/image';

export default function CompanyManagement() {
  const [formData, setFormData] = useState({
    nome_fantasia: '',
    razao_social: '',
    cnpj: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const cookies = new Cookie();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`/company/search/${searchQuery}`);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error searching companies:', error);
    }
  };

  const handleAddCompany = async () => {
    try {
      await api.post('/company', formData);
      alert('Empresa adicionada com sucesso!');
      setFormData({
        nome_fantasia: '',
        razao_social: '',
        cnpj: '', 
        email: '',
        telefone: '',
        categoria: '',
      });
      handleSearch();
    } catch (error) {
      alert('Erro ao adicionar empresa!');
      console.error('Error adding company:', error);
    }
  };

  const handleUpdateCompany = async () => {
    try {
      await api.put(`/company/${selectedCompany.cnpj}`, formData);
      alert('Company updated successfully!');
      setSelectedCompany(null);
      setFormData({
        nome_fantasia: '',
        razao_social: '',
        cnpj: '',
      });
      handleSearch();
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleDeleteCompany = async () => {
    try {
      await api.delete(`/company/${selectedCompany.cnpj}`);
      alert('Company deleted successfully!');
      setSelectedCompany(null);
      setFormData({
        nome_fantasia: '',
        razao_social: '',
        cnpj: '',
      });
      handleSearch();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  async function handleAllCompanies() {
    try {
      const response = await api.get('/company');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } 
  }

  useEffect(() => {
    handleAllCompanies();
  }, []);

  const options = [
    { value: 'Tecnologia', label: 'Tecnologia' },
    { value: 'Alimentação', label: 'Alimentação' },
    { value: 'Educação', label: 'Educação' },
    { value: 'Saúde', label: 'Saúde' },
    { value: 'Moda', label: 'Moda' },
    { value: 'Meio Ambiente', label: 'Meio Ambiente' },
    { value: 'Transporte', label: 'Transporte' },
    { value: 'Metalurgia', label: 'Metalurgia' },
    { value: 'Varejo', label: 'Varejo' },
    { value: 'Outros', label: 'Outros' },
  ];

  return (
    <div className="container mx-auto px-8 bg-white rounded-md">
      <Image
        src="/Logotipo.png"
        alt="Logo"
        width={250}
        height={250}
        className="mx-auto"
      />
      <h2 className="text-3xl text-center font-semibold mb-4">Management - Empresas</h2>
      <div className="mb-8">
        <hr />
        <br />
        <h3 className="text-2xl font-semibold mb-4">Adicionar Empresa</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="text"
              name="nome_fantasia"
              value={formData.nome_fantasia}
              onChange={handleInputChange}
              className="border-2 rounded-md px-4 py-2 w-full"
              placeholder='Nome Fantasia'
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="razao_social"
              value={formData.razao_social}
              onChange={handleInputChange}
              className="border-2 rounded-md px-4 py-2 w-full"
              placeholder='Razão Social'
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              className="border-2 rounded-md px-4 py-2 w-full"
              placeholder='CNPJ'
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              value={formData.cnpj}
              onChange={handleInputChange}
              className="border-2 rounded-md px-4 py-2 w-full"
              placeholder=' E-mail'
            />
          </div>
        </div>
          <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="text"
              name="telefone"
              value={formData.nome_fantasia}
              onChange={handleInputChange}
              className="border-2 rounded-md px-4 py-2 w-full"
              placeholder='Telefone'
            />
          </div>
          <div className="mb-4">
            <Select
              options={options}
              className="w-full "
              placeholder='Selecione a Categoria'
            />
          </div>
        </div>
        <button
          onClick={handleAddCompany}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Adicionar
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Empresas Cadastradas</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome Fantasia</th>
              <th className="py-2 px-4 border-b">Razão Social</th>
              <th className="py-2 px-4 border-b">CNPJ</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.cnpj} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{company.nome_fantasia}</td>
                <td className="py-2 px-4 border-b">{company.razao_social}</td>
                <td className="py-2 px-4 border-b">{company.cnpj}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={(e) => setSelectedCompany(company)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={(e) => handleDeleteCompany(company.cnpj)}
                    className="text-red-500 hover:underline"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCompany && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Edit / Delete Company</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Nome Fantasia:</label>
              <input
                type="text"
                name="nome_fantasia"
                value={formData.nome_fantasia}
                onChange={handleInputChange}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Razão Social:</label>
              <input
                type="text"
                name="razao_social"
                value={formData.razao_social}
                onChange={handleInputChange}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">CNPJ:</label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
              readOnly // Read-only for editing existing company
              className="border rounded-md px-4 py-2 w-full"
            />
          </div>
          <div>
            <button
              onClick={handleUpdateCompany}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Update Company
            </button>
            <button
              onClick={handleDeleteCompany}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete Company
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
