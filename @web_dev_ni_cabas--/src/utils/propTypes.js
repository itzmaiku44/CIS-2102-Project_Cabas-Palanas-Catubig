import PropTypes from 'prop-types';

// Email validator
const emailValidator = (props, propName, componentName) => {
  const email = props[propName];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Expected valid email format.`
    );
  }
};

// Password strength validator
const passwordValidator = (props, propName, componentName) => {
  const password = props[propName];
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  
  if (!passwordRegex.test(password)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.`
    );
  }
};

// Date validator (YYYY-MM-DD format)
const dateValidator = (props, propName, componentName) => {
  const date = props[propName];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!dateRegex.test(date)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Expected YYYY-MM-DD format.`
    );
  }
};

// Currency validator
const currencyValidator = (props, propName, componentName) => {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY'];
  const currency = props[propName];
  
  if (!validCurrencies.includes(currency)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Expected one of: ${validCurrencies.join(', ')}`
    );
  }
};

// Amount validator (positive number with 2 decimal places)
const amountValidator = (props, propName, componentName) => {
  const amount = props[propName];
  if (typeof amount !== 'number' || amount < 0 || !Number.isFinite(amount)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Expected positive number.`
    );
  }
};

// Image URL/Base64 validator
const imageValidator = (props, propName, componentName) => {
  const image = props[propName];
  if (image !== null && !image.startsWith('data:image/') && !image.startsWith('http')) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Expected valid image URL or base64 string.`
    );
  }
};

export const CustomPropTypes = {
  email: emailValidator,
  password: passwordValidator,
  date: dateValidator,
  currency: currencyValidator,
  amount: amountValidator,
  image: imageValidator,
  
  // Common shapes
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}).isRequired,
      emailValidator
    ]).isRequired,
    birthdate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}).isRequired,
      dateValidator
    ]).isRequired,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}).isRequired,
      imageValidator
    ]),
    password: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}).isRequired,
      passwordValidator
    ]).isRequired,
  }),
  
  settings: PropTypes.shape({
    isDarkTheme: PropTypes.bool.isRequired,
    isNotificationEnabled: PropTypes.bool.isRequired,
    currency: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}).isRequired,
      currencyValidator
    ]).isRequired,
  }),
  
  budget: PropTypes.shape({
    category: PropTypes.string.isRequired,
    spent: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({}).isRequired,
      amountValidator
    ]).isRequired,
    remaining: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({}).isRequired,
      amountValidator
    ]).isRequired,
  }),
};

export default CustomPropTypes; 