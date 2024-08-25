import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Breadcrumb } from "../../../../components";
import BlogPostList from "../blog-post-list";
import {
  Post01Cover,
  Post01CoverLetter,
  CreateResumeBtn,
} from "../../../../static/images/blog";

const Post01 = () => {
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
                  Capture Attention and Land Interviews with a Killer Cover
                  Letter.
                </h1>
                <img
                  src={Post01Cover}
                  alt="Capture Attention and Land Interviews with a Killer Cover Letter."
                  className="rounded-xl"
                />
                <p className="mt-5 mb-5">
                  A great cover letter is essential for any job application. It
                  highlights your most relevant skills and experience, and shows
                  why you're a perfect fit for the company. This guide will
                  teach you how to write a cover letter that gets you noticed by
                  hiring managers. A strong cover letter is your chance to shine
                  beyond your resume. It highlights your most relevant skills
                  and experience, and convinces employers you're a perfect fit
                  for the role and their company culture.
                </p>
                <h5 className="sub-heading mb-3">What is a Cover Letter?</h5>
                <p className="mb-5">
                  A cover letter is a short document that you submit with your
                  resume when applying for a job. It's your chance to introduce
                  yourself and explain why you're interested in the position.
                  Unlike your resume, which focuses on your skills and
                  experience, a cover letter allows you to tell your story in a
                  more personal way.
                </p>
                <h5 className="sub-heading mb-3">Why Write a Cover Letter?</h5>
                <p className="mb-5">
                  In today's job market, it's not enough to simply have a great
                  resume. You also need to be able to show employers that you're
                  a good fit for their company culture. A cover letter allows
                  you to do this by:
                </p>
                <ul className="mb-5">
                  <li>Highlighting your most relevant skills and experience</li>
                  <li>Showing your enthusiasm for the position</li>
                  <li>Providing context for your resume</li>
                  <li>Demonstrating your writing skills</li>
                </ul>
                <img
                  src={Post01CoverLetter}
                  alt="Capture Attention and Land Interviews with a Killer Cover Letter."
                  className="rounded-xl"
                />
                <h5 className="sub-heading mt-5 mb-3">
                  How to Write a Cover Letter
                </h5>
                <p className="mb-5">
                  Here are the steps on how to write a cover letter that will
                  impress hiring managers:
                </p>
                <ol className="mb-5">
                  <li>
                    <b>Brainstorm</b> Before you start writing, take some time
                    to brainstorm why you're interested in the position and the
                    company. What are your skills and experience that make you a
                    good fit?
                  </li>
                  <li>
                    <b>Research the Company</b> Take some time to learn about
                    the company you're applying to. Visit their website and
                    social media pages to get a sense of their culture and
                    values. This will help you tailor your cover letter to the
                    specific company.
                  </li>
                  <li>
                    <b>Structure Your Cover Letter</b> A cover letter should
                    include the following sections:
                    <ul className="ms-5">
                      <li>
                        <b>Heading:</b> Your name, contact information, and the
                        date
                      </li>
                      <li>
                        <b>Salutation:</b> Greet the hiring manager by name, if
                        possible
                      </li>
                      <li>
                        <b>Introduction:</b> Briefly introduce yourself and
                        state the position you're applying for. Highlight a
                        relevant skill or experience that makes you a good fit.
                      </li>
                      <li>
                        <b>Body Paragraphs:</b> This is where you can elaborate
                        on your skills and experience. Use specific examples to
                        show how you've been successful in the past. Be sure to
                        tailor your content to the job description.
                      </li>
                      <li>
                        <b>Conclusion:</b> Briefly reiterate your interest in
                        the position and call to action. Invite the hiring
                        manager to contact you for an interview.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <b>Proofread Carefully</b>A cover letter with typos or
                    grammatical errors will make a bad impression on hiring
                    managers. Proofread your cover letter carefully before
                    submitting it.
                  </li>
                </ol>
                <h5 className="sub-heading mb-3">
                  Tips for Writing a Strong Cover Letter
                </h5>
                <ul>
                  <li>
                    <b>Keep it concise:</b> Your cover letter should be no more
                    than one page long.
                  </li>
                  <li>
                    <b>Use strong action verbs:</b> Use action verbs to describe
                    your skills and experience. This will make your cover letter
                    more dynamic and engaging.
                  </li>
                  <li>
                    <b>Quantify your achievements:</b> Whenever possible,
                    quantify your achievements with numbers or metrics. This
                    will help hiring managers see the impact you've made in
                    previous roles.
                  </li>
                  <li>
                    <b>Proofread carefully:</b> Typos and grammatical errors
                    will make a bad impression on hiring managers. Proofread
                    your cover letter carefully before submitting it.
                  </li>
                </ul>
                <p>
                  By following these tips, you can write a cover letter that
                  will help you land your dream job.
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

export default Post01;
