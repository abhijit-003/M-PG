import React, { useState, useEffect } from 'react';
import { getRooms, createRoom } from '../../services/roomService.js';
import usePG from '../../hooks/usePG';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const roomTypes = [
  'single_sharing',
  'double_sharing',
  'triple_sharing',
  'double_sharing_attached_washroom',
  'double_sharing_gallery',
  'single_sharing_gallery'
];

const facilitiesOptions = [
  'wifi',
  'washing_machine',
  'fridge',
  'gas',
  'ac',
  'tv',
  'parking'
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    room_number: '',
    capacity: '',
    rent_amount: '',
    room_type: 'single_sharing',
    facilities: [],
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const { selectedPGs } = usePG();

  const fetchRooms = async () => {
    try {
      const response = await getRooms(selectedPGs);
      setRooms(response.data || []);
    } catch (error) { console.error('Error fetching rooms:', error); }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => {
        const facilities = checked
          ? [...prev.facilities, value]
          : prev.facilities.filter(f => f !== value);
        return { ...prev, facilities };
      });
    } else if (name === 'images') {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        setImageError('Maximum 5 images allowed');
        return;
      }
      setImageError('');
      // Convert to base64 array
      Promise.all(files.map(fileToBase64)).then(base64Images => {
        setFormData(prev => ({ ...prev, images: base64Images }));
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length > 5) {
      setImageError('Maximum 5 images allowed');
      return;
    }
    setLoading(true);
    setImageError('');
    try {
      await createRoom(formData);
      setShowModal(false);
      setFormData({
        room_number: '',
        capacity: '',
        rent_amount: '',
        room_type: 'single_sharing',
        facilities: [],
        images: []
      });
      fetchRooms();
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error creating room: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const formatFacilities = (facilities) => {
    if (!facilities || facilities.length === 0) return 'None';
    return facilities.map(f => f.replace(/_/g, ' ')).join(', ');
  };

  const formatImages = (images) => {
    return images && images.length > 0 ? `${images.length} images` : 'No images';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Rooms Management</h1>
        <Button onClick={() => setShowModal(true)}>Add New Room</Button>
      </div>

      {/* Rooms Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Room #</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-44">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Capacity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Rent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Facilities</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Images</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.room_number}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="capitalize">{room.room_type.replace(/_/g, ' ')}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{room.capacity}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  ₹{parseFloat(room.rent_amount || 0).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate" title={formatFacilities(JSON.parse(room.facilities || '[]'))}>
                  {formatFacilities(JSON.parse(room.facilities || '[]'))}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="text-blue-600 hover:text-blue-800 font-medium">{formatImages(JSON.parse(room.images || '[]'))}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${room.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {room.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rooms.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">No rooms found. Add your first room!</div>
        )}
      </div>

      {/* Add Room Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Room"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Number *</label>
            <input
              type="text"
              name="room_number"
              value={formData.room_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 101"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
            <select
              name="room_type"
              value={formData.room_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {roomTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity * (max 9)</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="9"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rent Amount (₹) *</label>
              <input
                type="number"
                name="rent_amount"
                value={formData.rent_amount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facilities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 p-3 border border-gray-200 rounded-md bg-gray-50">
              {facilitiesOptions.map(facility => (
                <label key={facility} className="flex items-center p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    value={facility}
                    checked={formData.facilities.includes(facility)}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{facility.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
            {formData.facilities.length > 0 && (
              <p className="text-sm text-blue-600 mt-1">
                Selected: {formData.facilities.map(f => f.replace(/_/g, ' ')).join(', ')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Images (max 5)</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {imageError && (
              <p className="text-sm text-red-600 mt-1">{imageError}</p>
            )}
            {formData.images.length > 0 && !imageError && (
              <p className="text-sm text-green-600 mt-1">{formData.images.length}/5 images selected</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Room'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Rooms;

