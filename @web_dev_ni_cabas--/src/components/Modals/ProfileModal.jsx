import React from 'react';
import PropTypes from 'prop-types';

const ProfileModal = ({ profileData, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#f8ebe2] rounded-lg p-2 w-[600px] h-[350px] relative flex justify-evenly">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="flex w-4/5">
          {/* Profile Info */}
          <div className="flex flex-col flex-grow pr-4 justify-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">{profileData.name}</h2>
            <p className="text-lg mb-2 text-blue-600">Email: {profileData.email}</p>
            <p className="text-lg mb-4 text-blue-600">Birthdate: {profileData.birthdate}</p>
            <button
              className="mt-4 p-2 bg-yellow-500 text-white rounded-md flex items-center w-fit"
              onClick={onEdit}
            >
              <i className="fas fa-clipboard mr-2"></i> Edit Profile
            </button>
          </div>

          {/* Profile Picture */}
          <div className="w-[220px] h-[200px] mt-10 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center border-2 border-gray-300 shadow">
            {profileData.image ? (
              <img src={profileData.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500">No Picture</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileModal.propTypes = {
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProfileModal; 