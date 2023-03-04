import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { loadState } from '../../Utils/helper';
import { accessToken } from '../../Utils/names';

const AuthenticatedPaths = ({ children }) => {
  const navigate = useNavigate();

  const AccessToken = loadState(accessToken);

  useEffect(() => {
    if (!AccessToken) {
      navigate('/signin');
    }
  }, [navigate, AccessToken]);

  return <div>{children}</div>;
};

export default AuthenticatedPaths;
