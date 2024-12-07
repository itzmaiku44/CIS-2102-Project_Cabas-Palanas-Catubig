import React, { useState } from 'react';
import WelcomeSection from './WelcomeSection';
import BudgetCarousel from './BudgetCarousel';
import ExpensesTable from './ExpensesTable';
import PropTypes from 'prop-types';

const Dashboard = ({ profileData }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <div className="flex-grow bg-gray-100 p-6">
      <WelcomeSection userName={profileData.name} />
      <BudgetCarousel 
        carouselIndex={carouselIndex}
        setCarouselIndex={setCarouselIndex}
      />
      <ExpensesTable />
    </div>
  );
};

Dashboard.propTypes = {
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default Dashboard; 