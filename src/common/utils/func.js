const getInitials = function (username) {
  if (username) {
    const names = username.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  } else {
    return '';
  }
};

const getServerURL = () => {
  if (process.env.DEV_SITE === 'true') {
    return process.env.SERVER_DEV_URL;
  } else {
    return process.env.NODE_ENV === 'development'
      ? process.env.SERVER_DEV_URL
      : process.env.NODE_ENV === 'production'
        ? process.env.SERVER_PROD_URL
        : process.env.SERVER_DEV_URL;
  }
};

const dateFormat = (date) => {
  const newDate = new Date(date * 1000).toLocaleString();
  return newDate;
};

const capitalizeFirstLetter = (string) => {
  return (string || ' ').charAt(0).toUpperCase() + (string || ' ').slice(1);
};

function delay(delayTime) {
  return new Promise((res) => setTimeout(res, delayTime));
}
function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkEmptyFilter(elm) {
  return elm != null && elm !== false && elm !== '';
}

const generateUUID = () => {
  let uuid = '';
  const characters = 'abcdef0123456789';
  const pattern = [8, 4, 4, 4, 12];

  pattern.forEach((length, index) => {
    for (let i = 0; i < length; i++) {
      uuid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (index < pattern.length - 1) {
      uuid += '-';
    }
  });

  return uuid;
};

const intercomTeamNameInTag = ({ tags, intercomTeams }) => {
  const tag = tags;
  const filteredTeamNames =
    intercomTeams.length > 0 && intercomTeams.filter((team) => tag.includes(team.id)).map((team) => team.name);

  return filteredTeamNames ? filteredTeamNames.join(',') : null;
};

export {
  getInitials,
  getServerURL,
  dateFormat,
  capitalizeFirstLetter,
  delay,
  randomNumberInRange,
  checkEmptyFilter,
  generateUUID,
  intercomTeamNameInTag,
};
