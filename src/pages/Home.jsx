import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, Postcard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
}, [])

  if (posts.length === 0) {
    return <h1>No Posts Found</h1>;
  }

return (
  <div className='w-full py-8'>
      <Container>
          <div className='flex flex-wrap'>
              {posts.map((post) => ( // REMEMBER: () lagaoge to return nhi karna padega
                  <div key={post.$id} className='p-2 w-1/4'>
                      <Postcard {...post} />
                  </div>
              ))}
          </div>
      </Container>
  </div>
)
}

export default Home;
