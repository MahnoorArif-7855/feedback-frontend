import { Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;

const FetchUserData = ({ userId }) => {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    fetch(`/api/getUser?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoginUser(data.user.metadata.lastSignInTime);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoginUser(null);
      });
  }, [userId]);

  if (!loginUser) {
    return <div>N/A</div>;
  }

  return <Text>{loginUser}</Text>;
};

export default FetchUserData;
