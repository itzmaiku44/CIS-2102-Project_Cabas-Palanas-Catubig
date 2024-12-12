import React, { useState } from 'react';
import WelcomeSection from '../WelcomeSection';
import BudgetCarousel from '../BudgetCarousel';
import ExpensesTable from '../ExpensesTable';

const Content1 = ({ profileData }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Welcome Section */}
      <WelcomeSection userName={profileData.name} />

      {/* Existing Budgets Section */}
      <div className="mb-8">
        <BudgetCarousel 
          carouselIndex={carouselIndex}
          setCarouselIndex={setCarouselIndex}
        />
      </div>

      {/* Recent Expenses Section */}
      <div>
        <ExpensesTable />
      </div>
    </div>
  );
};

export default Content1;