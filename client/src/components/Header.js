import { Link } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const authorized = checkAuth();

  return (
    <>
      <div className="bg-gray-100">
        <div className="flex items-center justify-between border p-4">
          <div className="">
            <h3 className="text-2xl font-semibold">Mew Mew Blogs</h3>
          </div>
          {!authorized ? (
            <></>
          ) : (
            <>
              <div>
                <ul className="flex gap-4">
                  <Link to={"/"}>
                    <li className="text-md font-medium border text-black p-2 rounded-md hover:bg-gray-200">
                      All Blogs
                    </li>
                  </Link>
                  <Link to={"/myBlogs"}>
                    <li className="text-md font-medium border text-black p-2 rounded-md hover:bg-gray-200">
                      My Blogs
                    </li>
                  </Link>
                  <Link to={"/blogs/add"}>
                    <li className="text-md font-medium border text-black p-2 rounded-md hover:bg-gray-200">
                      Write a Blog
                    </li>
                  </Link>
                </ul>
              </div>
            </>
          )}
          <div>
            <ul className="flex gap-4">
              {!authorized ? (
                <>
                  <Link to={"/login"}>
                    <li className="text-md font-medium border text-black p-2 rounded-md hover:bg-gray-200">
                      Login/Signup
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <li
                    onClick={logout}
                    className="cursor-pointer text-md font-medium border text-black p-2 rounded-md hover:bg-gray-200"
                  >
                    Logout
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
