import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CurrencyContext = createContext();

export const currencies = {
  PHP: {
    symbol: '₱',
    code: 'PHP'
  },
  USD: {
    symbol: '$',
    code: 'USD'
  },
  EUR: {
    symbol: '€',
    code: 'EUR'
  },
  GBP: {
    symbol: '£',
    code: 'GBP'
  },
  JPY: {
    symbol: '¥',
    code: 'JPY'
  }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(currencies.PHP);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext; 