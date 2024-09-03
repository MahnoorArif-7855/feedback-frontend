import { AUTHORITY } from '@/common/utils/constant';
import { useSelector } from 'react-redux';

export const useUser = () => {
  const { authDetails } = useSelector((state) => state.auth);
  const { type } = authDetails || {};

  return {
    isAdmin: type === AUTHORITY.ADMIN,
  };
};
