import React from 'react'

const sidebar = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [currency, setCurrency] = useState("USD");
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        birthdate: '1990-01-01',
    });


    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleProfileModal = () => setIsProfileModalOpen(!isProfileModalOpen);
    const handleImageUpload = (event) => {
    const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarExpanded ? "w-60" : "w-16"
        } bg-blue-600 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-3 mt-4">
          <span className={`${isSidebarExpanded ? "block" : "hidden"} font-bold text-xl mt-7 text-center`}>
            SHEPHERD'S LEDGER
          </span>
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-blue-700 p-2 rounded"
          >
            <i className={`fas ${isSidebarExpanded ? "fa-angle-left" : "fa-angle-right"}`}></i>
          </button>
        </div>
        <ul className="flex-1 mt-10">
          <li className="hover:bg-blue-700 p-5 flex items-center" onClick={toggleProfileModal}>
            <i className="fas fa-user"></i>
            {isSidebarExpanded && <span className="ml-3 font-semibold">[NAME]</span>}
          </li>
          <li className="hover:bg-blue-700 p-5 flex items-center">
            <i className="fas fa-chart-line"></i>
            {isSidebarExpanded && <span className="ml-3 font-semibold">Dashboard</span>}
          </li>
          <li className="hover:bg-blue-700 p-5 flex items-center">
            <i className="fas fa-wallet"></i>
            {isSidebarExpanded && <span className="ml-3 font-semibold">Expenses</span>}
          </li>
          <li className="hover:bg-blue-700 p-5 flex items-center">
            <i className="fas fa-calculator"></i>
            {isSidebarExpanded && <span className="ml-3 font-semibold">Budget</span>}
          </li>
        </ul>
        <div className="p-6 hover:bg-blue-700 flex items-center">
          <i className="fas fa-sign-out-alt"></i>
          {isSidebarExpanded && <span className="ml-3 font-semibold">Logout</span>}
        </div>
        <div className="p-6 mb-10 hover:bg-blue-700 flex items-center" onClick={toggleModal}>
          <i className="fas fa-cog"></i>
          {isSidebarExpanded && <span className="ml-3 font-semibold">Settings</span>}
        </div>
      </div>
        {/* ----------------------------------------------------- */}
                               {/* Main Content */}
        <div className="mainContent">

        </div>



        {/* ------------------------------------------------------------ */}
        
        
        {/* Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96 relative">
            {/* Close Button */}
            <button
                onClick={toggleModal}
                className="absolute top-2 right-3 text-gray-500 text-2xl"
            >
                <i className="fas fa-times"></i>
            </button>

            <h2 className="text-xl font-bold mb-4">Settings</h2>

            {/* Notification and Theme Toggle (in one line) */}
            <div className="flex justify-between items-center mb-4">
                
                <div className="flex items-center">
                <button
                    className={`w-12 h-6 flex items-center rounded-full ${
                    isDarkTheme ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                >
                    <div
                    className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                        isDarkTheme ? "translate-x-6" : "translate-x-0"
                    }`}
                    ></div>
                </button>
                <span className="ml-2 font-semibold">Dark Mode</span>
                </div>

                <div className="flex items-center">
                <button
                    className={`w-12 h-6 flex items-center rounded-full ${
                    isNotificationEnabled ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
                >
                    <div
                    className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                        isNotificationEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                    ></div>
                </button>
                <span className="ml-2 font-semibold">Notifications</span>
                </div>
            </div>

            {/* Currency Dropdown */}
            <div className="mb-4">
                <label htmlFor="currency" className="block text-sm mb-2 font-bold">Currency</label>
                <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border rounded-md"
                >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                </select>
            </div>

            {/* Save Button */}
            <div className="flex justify-start mb-4">
                <button
                onClick={handleSave}
                className="w-full p-2 bg-blue-500 text-white rounded-md"
                >
                Save Settings
                </button>
            </div>
            </div>
        </div>
        )}


      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/3 h-80 relative flex">
            {/* Close Button */}
            <button
              onClick={toggleProfileModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-sm"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Modal Content */}
            <div className="flex w-full">
              {/* User Info */}
              <div className="flex-grow flex flex-col justify-center pr-6">
                <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
                <p className="text-lg mb-2">Email: {user.email}</p>
                <p className="text-lg">Birthdate: {user.birthdate}</p>
              </div>

              {/* Image Holder */}
              <div className="flex-none mt-8 w-48 h-40 rounded-3xl overflow-hidden border-2 border-gray-300">
                <label htmlFor="profileImage" className="cursor-pointer w-full h-full flex justify-center items-center bg-gray-200 hover:bg-gray-300">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">Upload</span>
                  )}
                  <input
                    id="profileImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="absolute bottom-4 left-4 p-2 bg-blue-500 text-white rounded-md flex items-center">
              <i className="fas fa-clipboard mr-2"></i> Edit Profile
            </button>
          </div>
        </div>
      )}


    </div>
  )
}

export default sidebar