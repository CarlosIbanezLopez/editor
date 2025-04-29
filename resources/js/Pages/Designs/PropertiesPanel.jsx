import React, { useState } from 'react';

export default function PropertiesPanel({ selectedElement, updateElement, setIsEditing }) {
  if (!selectedElement) return null;

  const [activeTab, setActiveTab] = useState('general');

  const handleFocus = () => setIsEditing(true);
  const handleBlur = () => setIsEditing(false);
  const handleChange = (key, value) => {
    updateElement({
      ...selectedElement,
      props: {
        ...selectedElement.props,
        [key]: value,
      },
    });
  };

  return (
    <div className="fixed top-6 right-6 w-80 h-[calc(100vh-3rem)] bg-gradient-to-br from-blue-50 to-white border border-blue-200 shadow-2xl rounded-lg overflow-hidden z-50">
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Propiedades</h2>
        <button onClick={() => setActiveTab('css')} className={`px-2 py-1 text-sm rounded ${activeTab === 'css' ? 'bg-blue-500' : 'bg-blue-700/30'}`}>CSS</button>
      </div>
      <div className="flex">
        <nav className="w-24 bg-blue-50 border-r border-blue-200">
          <ul className="space-y-1 p-2">
            <li>
              <button
                onClick={() => setActiveTab('general')}
                className={`block w-full text-left px-2 py-1 rounded ${activeTab === 'general' ? 'bg-blue-200 text-blue-800 font-medium' : 'text-blue-600 hover:bg-blue-100'}`}
              >General</button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('layout')}
                className={`block w-full text-left px-2 py-1 rounded ${activeTab === 'layout' ? 'bg-blue-200 text-blue-800 font-medium' : 'text-blue-600 hover:bg-blue-100'}`}
              >Layout</button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('style')}
                className={`block w-full text-left px-2 py-1 rounded ${activeTab === 'style' ? 'bg-blue-200 text-blue-800 font-medium' : 'text-blue-600 hover:bg-blue-100'}`}
              >Style</button>
            </li>
          </ul>
        </nav>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {activeTab === 'general' && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-blue-700">ID</label>
                <input
                  type="text"
                  value={selectedElement.id}
                  readOnly
                  className="w-full bg-blue-50 border border-blue-200 rounded px-3 py-1 text-sm text-gray-700"
                />
              </div>
              {(selectedElement.props.text !== undefined) && (
                <>
                  <label className="block mb-1 text-sm font-medium text-blue-700">Texto</label>
                  <input
                    type="text"
                    value={selectedElement.props.text}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange('text', e.target.value)}
                    className="w-full border border-blue-300 rounded px-3 py-1 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                  />
                </>
              )}
            </>
          )}

          {activeTab === 'layout' && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-blue-700">Posición X</label>
                <input
                  type="number"
                  value={selectedElement.props.x}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange('x', parseInt(e.target.value))}
                  className="w-full border border-blue-300 rounded px-3 py-1 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-blue-700">Posición Y</label>
                <input
                  type="number"
                  value={selectedElement.props.y}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange('y', parseInt(e.target.value))}
                  className="w-full border border-blue-300 rounded px-3 py-1 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                />
              </div>
            </>
          )}

          {activeTab === 'style' && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-blue-700">Color de Fondo</label>
                <input
                  type="color"
                  value={selectedElement.props.fill || selectedElement.props.backgroundColor || '#ffffff'}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(selectedElement.type === 'button' ? 'fill' : 'backgroundColor', e.target.value)}
                  className="w-full h-8 p-0 border-0"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-blue-700">Color de Texto</label>
                <input
                  type="color"
                  value={selectedElement.props.color || '#000000'}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="w-full h-8 p-0 border-0"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-blue-700">Borde Radio</label>
                <input
                  type="number"
                  value={selectedElement.props.cornerRadius || 0}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange('cornerRadius', parseInt(e.target.value))}
                  className="w-full border border-blue-300 rounded px-3 py-1 focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
