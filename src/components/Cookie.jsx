import { Link } from "react-router-dom";
function Cookie({ decline, setDecline }) {
  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setDecline(false);
  };
  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setDecline(false);
  };
  if (!decline) return null;
  return (
    <div className="p-6 text-white flex flex-col items-center fixed h-[290px] w-full left-0 right-0 bg-gray-900 bottom-0 z-30">
      <h2 className="font-medium text-lg mb-2">Cookie Notification</h2>
      <span className="text-center text-sm leading-normal">
        This website uses cookies to optimize your experience
        and to provide us insight on how to interact with the site.
        All information shared with us through cookies are secure
        and covered by our data privacy obligations. You can access
        our Privacy Policy{" "}
        <Link to="/policy">
          <span className="underline font-medium">here</span>
        </Link>
      </span>
      <div className="flex gap-6 mt-8">
        <button
          onClick={handleDecline}
          className="text-md font-medium"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="text-gray-800 bg-white font-medium py-3 px-5 rounded-lg"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
export default Cookie;