import React, {useEffect,useState} from 'react';
import axios from 'axios';
import _ from 'lodash';

const pageSize = 10;

const Posts = () => {
    const [posts, setposts] = useState();
    const [paginatedPosts, setpaginatedPosts] = useState();
    const [currentPage, setcurrentPage] = useState(1);
    useEffect(() => {
        axios.get("https://reqres.in/api/users?page=2")
        .then((res) => {
             setposts(res.data);
             setpaginatedPosts(_(res.data).slice(0).take(pageSize).value());

        }); 
    }, []);

    const pageCount = posts ? Math.ceil(posts.length/pageSize) :0;
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    const pagination = (pageNo) => {
      setcurrentPage(pageNo);
      const startIndex = (pageNo - 1) * pageSize;
      const paginatedPosts = _(posts).data.slice(startIndex).take(pageSize).value();
      setpaginatedPosts(paginatedPosts);
    }
    return <div className="container">{
          !paginatedPosts ? ("No data found"):(
              <table className="table">
              <thead>
                  <tr>
                  <th scope="col">User Id</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Picture</th>
      
                  </tr>
              </thead>
              <tbody>
              {
                                  posts.data.map((post, index)=>(
                                  <tr key={index}>
                                  <td>{post.id}</td>
                                  <td>{post.first_name}</td>
                                  <td>{post.last_name}</td>
                                  <td>{post.email}</td>
                                  <td><img src={post.avatar}></img></td>
                                  </tr>
                              ))} 
              </tbody>
              </table>
              )}

              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                 
                      <li  className="page-link">1</li>
                      <li  className="page-link">2</li>
                      <li  className="page-link">3</li>
                      <li  className="page-link">4</li>
                      <li  className="page-link">5</li>
                      <li  className="page-link">6</li>
                      <li  className="page-link">7</li>



                </ul>
              </nav>
}
    </div>

  };

export default Posts;