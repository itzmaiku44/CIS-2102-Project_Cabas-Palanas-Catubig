import React from 'react'

const sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  /* const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    birthdate: '1990-01-01',
  }); */
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    birthdate: '1990-01-01',
    image: null, // Default: no image
    password: '1234',
  });


  const toggleEditProfileModal = () => setIsEditProfileModalOpen(!isEditProfileModalOpen);
  const toggleProfileModal = () => setIsProfileModalOpen(!isProfileModalOpen);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData((prev) => ({
          ...prev,
          image: reader.result, // Save image as a base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePrevious = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? Math.ceil(budgets.length / 2) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === Math.ceil(budgets.length / 2) - 1 ? 0 : prev + 1
    );
  };

  const budgets = [
    { category: "Food", spent: 50, remaining: 50 },
    { category: "Travel", spent: 70, remaining: 30 },
    { category: "Shopping", spent: 40, remaining: 60 },
    { category: "Entertainment", spent: 80, remaining: 20 },
    { category: "Health", spent: 60, remaining: 40 },
  ];

  const handleSave = () => {
    alert(`Settings saved!\nTheme: ${isDarkTheme ? "Dark" : "Light"}\nNotifications: ${
      isNotificationEnabled ? "On" : "Off"
    }\nCurrency: ${currency}`);
    toggleModal();
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


        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#f8ebe2] rounded-lg p-2 w-[600px] h-[350px] relative flex justify-evenly">
              {/* Close Button */}
              <button
                onClick={toggleProfileModal}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="flex w-4/5">
                <div className="flex flex-col flex-grow pr-4 justify-center">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">{profileData.name}</h2>
                  <p className="text-lg mb-2 text-blue-600">Email: {profileData.email}</p>
                  <p className="text-lg mb-4 text-blue-600">Birthdate: {profileData.birthdate}</p>
                  <button
                    className="mt-4 p-2 bg-yellow-500 text-white rounded-md flex items-center w-fit"
                    onClick={toggleEditProfileModal}
                  >
                    <i className="fas fa-clipboard mr-2"></i> Edit Profile
                  </button>
                </div>

                {/* Profile Picture (Right) */}
                <div className="w-[220px] h-[200px] mt-10 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center border-2 border-gray-300 shadow">
                  {profileData.image ? (
                    <img src={profileData.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">picture</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#f8ebe2] rounded-lg p-6 w-[600px] relative">
            {/* Close Button */}
            <button
              onClick={toggleEditProfileModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Edit Profile Content */}
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Profile</h2>
            <div className="flex">
              {/* User Info */}
              <div className="flex-grow pr-4">
                <div className="mb-4">
                  <label className="block text-blue-600 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-blue-600 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-blue-600 mb-2">Birthdate</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={profileData.birthdate}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-blue-600 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    value={profileData.password}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-blue-600 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Confirm your password"
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300 relative">
                {profileData.image ? (
                  <img src={profileData.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <button 
              onClick={toggleEditProfileModal}
              className="mt-4 w-full bg-blue-500 text-white rounded p-2">
              Save
            </button>
          </div>
        </div>
      )}


    </div>
  )
}

export default sidebar