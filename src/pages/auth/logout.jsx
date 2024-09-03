import { firebaseAuth } from '@/../firebase';
import { userProfileInfo } from '@/state/redux/userProfile/userProfileSlice';
import { signOut } from 'firebase/auth';
import * as React from 'react';
import { useDispatch } from 'react-redux';

export default function Logout() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userProfileInfo(null));
    signOut(firebaseAuth);
    firebaseAuth.signOut();
    localStorage.setItem('token', 'null');
    window.location.href = '/';
  }, [dispatch]);

  return null;
}
