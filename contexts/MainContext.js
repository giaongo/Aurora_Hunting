import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});
const MainProvider = (props) => {
  const [update, setUpdate] = useState(false);
  return (
    <MainContext.Provider value={{update, setUpdate}}>
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
