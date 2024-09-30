import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const LetterForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [recipientAddress, setRecipientAddress] = useState(['']);
  const [employeeName, setEmployeeName] = useState('');
  const [dateOfAuthorized, setDateOfAuthorized] = useState('');
  const [dateOfEnforcement, setDateOfEnforcement] = useState('');
  const [dateOfRetire, setDateOfRetire] = useState('');
  const [signatoryName, setSignatoryName] = useState('');
  const [signatoryPosition, setSignatoryPosition] = useState('');
  const [specialNotes, setSpecialNotes] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      recipientAddress,
      employeeName,
      dateOfAuthorized,
      dateOfEnforcement,
      dateOfRetire,
      signatoryName,
      signatoryPosition,
      specialNotes,
    });
  };

  const handleAddNote = () => {
    setSpecialNotes([...specialNotes, '']);
  };

  const handleRemoveNote = (index) => {
    const newNotes = [...specialNotes];
    newNotes.splice(index, 1);
    setSpecialNotes(newNotes);
  };

  const handleChangeNote = (index, value) => {
    const newNotes = [...specialNotes];
    newNotes[index] = value;
    setSpecialNotes(newNotes);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl p-6 mx-auto bg-gray-200 border rounded-lg shadow-md">
      <div className="mb-6 text-center border border-black">
        <h2 className="mt-6 mb-2 text-2xl font-bold text-gray-800">Department Of Immigration And Emigration</h2>
        <h2 className="mb-6 font-semibold text-gray-800 text-1xl">Service Certificate Form</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <select
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>Select a title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
            <option value="Rev">Rev</option>
            <option value="Hon">Hon</option>
          </select>
        </div>

        <div className="col-span-1 space-y-4 md:col-span-2 lg:col-span-2">
          <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700">Recipient's Address</label>
          {recipientAddress.map((addressLine, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={addressLine}
                onChange={(e) => {
                  const newAddress = [...recipientAddress];
                  newAddress[index] = e.target.value;
                  setRecipientAddress(newAddress);
                }}
                className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={`Address Line ${index + 1}`}
              />
              {index > 0 && (
                <button type="button" onClick={() => {
                  const newAddress = [...recipientAddress];
                  newAddress.splice(index, 1);
                  setRecipientAddress(newAddress);
                }} className="ml-2 text-red-500 hover:text-red-700">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setRecipientAddress([...recipientAddress, ''])} className="ml-2 text-blue-500 hover:text-blue-700">
            Add New Address Line
          </button>
        </div>

        <div className="space-y-4">
          <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">Recipient's Name</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Employee's Name"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="dateOfEnforcement" className="block text-sm font-medium text-gray-700">Date of Enforcement</label>
          <input
            type="date"
            id="dateOfEnforcement"
            value={dateOfEnforcement}
            onChange={(e) => setDateOfEnforcement(e.target.value)}
            className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="dateOfAuthorized" className="block text-sm font-medium text-gray-700">Date of Authorized</label>
          <input
            type="date"
            id="dateOfAuthorized"
            value={dateOfAuthorized}
            onChange={(e) => setDateOfAuthorized(e.target.value)}
            className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="dateOfRetire" className="block text-sm font-medium text-gray-700">Date of Retire</label>
          <input
            type="date"
            id="dateOfRetire"
            value={dateOfRetire}
            onChange={(e) => setDateOfRetire(e.target.value)}
            className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-1 space-y-4 md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Special Notes</label>
          {specialNotes.map((note, index) => (
            <div key={index} className="flex items-center mb-2">
              <textarea
                value={note}
                onChange={(e) => handleChangeNote(index, e.target.value)}
                className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={`Special Note ${index + 1}`}
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveNote(index)} className="ml-2 text-red-500 hover:text-red-700">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddNote} className="ml-2 text-blue-500 hover:text-blue-700">
            Add New Note
          </button>
        </div>

        <div className="space-y-4">
          <label htmlFor="signatoryName" className="block text-sm font-medium text-gray-700">Signatory's Name</label>
          <input
            type="text"
            id="signatoryName"
            value={signatoryName}
            onChange={(e) => setSignatoryName(e.target.value)}
            className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Signatory's Name"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="signatoryPosition" className="block text-sm font-medium text-gray-700">Signatory's Position</label>
          <input
            type="text"
            id="signatoryPosition"
            value={signatoryPosition}
            onChange={(e) => setSignatoryPosition(e.target.value)}
            className="block w-full px-4 py-2 mt-1 text-gray-700 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Signatory's Position"
          />
        </div>
      </div>

      <button type="submit" className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Generate Letter
      </button>
    </form>
  );
};

export default LetterForm;
s