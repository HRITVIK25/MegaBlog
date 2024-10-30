import React from "react";
import appwriteService from "../appwrite/config.js";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
function Postcard(
  // $id is appwrite syntax
  { $id, title, featuredImage, content }
) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            className="rounded-xl"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <h4 className="text-xl font-bold">{parse(content)}</h4>  
        {/* this parsing is done as appwrite pura element lautata hai like <P>example</P> to convert this to string example we parse */}
      </div>
    </Link>
  );
}

export default Postcard;
