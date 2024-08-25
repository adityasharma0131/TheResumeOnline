import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Breadcrumb } from "../../../../components";
import BlogPostList from "../blog-post-list";
import {
  Post04Cover,
  Post0401,
  CreateResumeBtn,
  Post0402,
} from "../../../../static/images/blog";

const Post04 = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {/* Breadcruumb */}
      <Breadcrumb />

      {/* Post Section */}
      <section className="section post-detail">
        <div className="container">
          <div className="grid">
            <div className="grid grid-cols-10 gap-10">
              <div className="col-span-2">
                <Link
                  to={isAuthenticated ? "/templates" : "/login"}
                  className="side-btn"
                >
                  <img src={CreateResumeBtn} alt="" />
                </Link>
              </div>

              <div className="col-span-6">
                <h1 className="heading text-primary mb-7">
                  The Best Questions To Ask in a Job Interview
                </h1>
                <img
                  src={Post04Cover}
                  alt="The Best Questions To Ask in a Job Interview"
                  className="rounded-xl"
                />

                <h2 className="heading text-primary mb-7">
                  Top Questions to Ask During a Job Interview: Insights for
                  Success
                </h2>
                <p className="mt-5 mb-5">
                  When you're in an interview, it's a good idea to ask about the
                  company's work environment and what they aim to achieve. This
                  can show that you care about the company's success and give
                  the interviewer a chance to share their personal views. It can
                  also help you better understand the job and the company. Here
                  are some questions you might consider asking at the end of the
                  interview:
                </p>

                <h5 className="sub-heading mb-3">
                  1. Questions About the Role and Responsibilities
                </h5>
                <ul className="mb-5">
                  <li>
                    Can you describe a typical day or week in this position?
                  </li>
                  <li>
                    What are the key objectives or priorities for this role in
                    the first six months?
                  </li>
                  <li>
                    How does this role contribute to the overall goals and
                    success of the team or organization?
                  </li>
                </ul>
                <p className="mb-5">
                  Asking about the specifics of the role shows your interest in
                  understanding what will be expected of you and how you can
                  contribute effectively.
                </p>

                <h5 className="sub-heading mb-3">
                  Questions About Company Culture and Values
                </h5>
                <ul className="mb-5">
                  <li>How would you describe the company culture here?</li>
                  <li>
                    What are the core values that drive this organization?
                  </li>
                  <li>
                    Can you tell me about the team dynamics in the department I
                    would be working with?
                  </li>
                </ul>
                <p className="mb-5">
                  Understanding the company culture and values helps you assess
                  if you align with the organization's mission and if it's a
                  place where you can thrive.
                </p>

                <h5 className="sub-heading mb-3">
                  Questions About Career Development and Growth Opportunities
                </h5>
                <ul className="mb-5">
                  <li>
                    How does the company support professional development and
                    career growth for its employees?
                  </li>
                  <li>
                    Are there opportunities for advancement or additional
                    training within the company?
                  </li>
                  <li>
                    Can you share examples of how employees have grown in their
                    roles here?
                  </li>
                </ul>
                <p className="mb-5">
                  These questions demonstrate your long-term interest in the
                  company and your desire to grow professionally within the
                  organization.
                </p>

                <h5 className="sub-heading mb-3">
                  Questions About Performance Expectations and Success Metrics
                </h5>
                <ul className="mb-5">
                  <li>How is success measured in this role?</li>
                  <li>
                    What are the key performance indicators (KPIs) you would use
                    to evaluate performance in this position?
                  </li>
                  <li>
                    How do you support employees in achieving their performance
                    goals?
                  </li>
                </ul>
                <p className="mb-5">
                  Understanding how your performance will be evaluated helps you
                  gauge expectations and ensure alignment with your skills and
                  capabilities.
                </p>

                <h5 className="sub-heading mb-3">
                  Questions About the Interviewer's Experience and Perspective
                </h5>
                <ul className="mb-5">
                  <li>What do you enjoy most about working here?</li>
                  <li>
                    How has your own career progressed since joining the
                    company?
                  </li>
                  <li>
                    What are the biggest challenges facing the team or
                    department right now?
                  </li>
                </ul>
                <p className="mb-5">
                  Asking about the interviewer's experiences can provide
                  valuable insights into the company culture and the challenges
                  and opportunities you may encounter.
                </p>

                <img
                  src={Post0401}
                  alt="The Best Questions To Ask in a Job Interview"
                  className="rounded-xl"
                />

                <h5 className="sub-heading mb-3">
                  Tips for Asking Questions in a Job Interview:
                </h5>
                <ul className="mb-5">
                  <li>
                    <b>Prepare in Advance:</b> Research the company and the role
                    to formulate specific and relevant questions.
                  </li>
                  <li>
                    <b>Listen Actively:</b> Pay attention to the interviewer's
                    responses to tailor follow-up questions or clarify any
                    points of interest.
                  </li>
                  <li>
                    <b>Be Genuine:</b> Ask questions that genuinely interest you
                    and reflect your curiosity about the company and the role.
                  </li>
                  <li>
                    <b>Avoid Salary and Benefits Questions:</b> Save questions
                    about salary, benefits, and perks for later stages of the
                    interview process unless the interviewer brings them up
                    first.
                  </li>
                </ul>

                <img
                  src={Post0402}
                  alt="The Best Questions To Ask in a Job Interview"
                  className="rounded-xl"
                />

                <h5 className="sub-heading mt-5 mb-3">Conclusion</h5>
                <p className="mb-5">
                  Asking the right questions in a job interview is not only
                  about gathering information but also about showcasing your
                  interest, understanding, and preparedness for the role and the
                  company. By asking thoughtful questions, you demonstrate your
                  enthusiasm and commitment to making an informed decision about
                  your next career move. Use these questions as a guide to
                  conduct a successful job interview and leave a positive
                  impression on your potential employer.
                </p>
              </div>

              <div className="col-span-2">
                <aside className="blog-sidebar">
                  <h4 className="mb-5">Related Post</h4>
                  <ul>
                    {BlogPostList.map((post) => (
                      <li key={post.id}>
                        <Link to={`/blog${post.url}`}>
                          <img src={post.link} alt={post.name} />
                          <h6>{post.name}</h6>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post04;
