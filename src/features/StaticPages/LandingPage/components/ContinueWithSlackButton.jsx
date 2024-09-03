import SlackIcon from '@/../public/images/slackIcon';
import { useSlackSignIn } from '@/features/Authentication/components/SignInForm/hooks/useSlackSignIn';
import { Spin } from 'antd';

export const ContinueWithSlackButton = () => {
  const { handleSignIn, isLoading: slackLoading, isSigningUp } = useSlackSignIn();

  if (isSigningUp) {
    return (
      <div>
        <Spin spinning />
      </div>
    );
  }

  return (
    <button
      className={`flex items-center gap-2 rounded-xl bg-black px-6 py-1 text-base text-white hover:bg-gray-800 ${slackLoading ? 'bg-gray-600' : ''}`}
      onClick={handleSignIn}
      disabled={slackLoading}
    >
      <SlackIcon />
      Continue with Slack
    </button>
  );
};
