import React from "react";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    // this is put on array so new button can be added easily
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            <div className="mr-4">
              <Link to="/">
                <Logo width="70px" />
                <Link></Link>
              </Link>
            </div>
            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item.active ? ( // itemn will only be displayed when active to not active will display login sgnup and after login others will be displayed accordingly
                  <li key={item.name}>
                    <button
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      onClick={() => navigate(item.slug)} // button in every li so when li pressed it goes to that link of slug 
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && ( // if authstatus is true then button is displayed so it will be displayed after authentication
                <li>
                  <LogoutBtn></LogoutBtn>
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </div>
  );
}

export default Header;
