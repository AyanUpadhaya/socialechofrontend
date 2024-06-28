import { Link } from "react-router-dom";
import useReduxStore from "../../hooks/useReduxStore";

const UserCard = ({ user }) => {
  return (
    <div className="w-[320px] bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <img
        className="w-32 h-32 rounded-full mx-auto mt-4"
        src={user.imgUrl}
        alt="User Avatar"
      />
      <div className="text-center mt-4">
        <p className="text-lg text-gray-800 font-semibold">{user?.name}</p>
        <Link
          to={`/dashboard/userprofile/${user?.username}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 block w-2/3 mx-auto"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
