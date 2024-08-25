import { Link } from "react-router-dom";

import { Breadcrumb } from "../../../components";
import BlogPostList from "./blog-post-list";

const BlogList = () => {
  return (
    <>
      {/* Breadcruumb */}
      <Breadcrumb />

      <section className="section blog-list">
        <div className="container">
          <div className="grid grid-cols-3 gap-7">
            {BlogPostList.map((item) => (
              <div className="col" key={item.id}>
                <Link to={`/blog${item.url}`} className="post-card">
                  <div className="image">
                    <img src={item.link} alt={item.name} />
                  </div>
                  <div className="text">
                    <h5>{item.name}</h5>
                    <p>{item.excerpt}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
