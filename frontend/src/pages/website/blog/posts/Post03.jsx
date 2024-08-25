import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Breadcrumb } from "../../../../components";
import BlogPostList from "../blog-post-list";
import {
  Post03Cover,
  Post0301,
  CreateResumeBtn,
} from "../../../../static/images/blog";

const Post03 = () => {
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
                  How to Write a Resume <br />
                  The Ultimate Guide to Writing a Resume
                </h1>
                <img
                  src={Post03Cover}
                  alt="How to Write a Resume"
                  className="rounded-xl"
                />
                <p className="mt-5 mb-5">
                  Your resume is more than just a document listing your work
                  history; it's your personal marketing tool in the professional
                  world. Whether you're crafting your first resume or updating
                  it for a new career opportunity, understanding the essentials
                  of resume writing is crucial. This guide will walk you through
                  the steps to create a compelling resume that highlights your
                  skills, experiences, and achievements effectively.
                </p>

                <h5 className="sub-heading mb-3">
                  1. Understand the Purpose of Your Resume
                </h5>
                <p className="mb-5">
                  Before you start writing, it's essential to grasp the purpose
                  of a resume. A resume serves as a snapshot of your
                  professional life, showcasing your qualifications and
                  suitability for a specific job or career path. It should
                  persuade employers to consider you for an interview by
                  demonstrating your relevant skills and experiences.
                </p>

                <h5 className="sub-heading mb-3">
                  2. Choose the Right Resume Format
                </h5>
                <p className="mb-5">
                  There are several resume formats to choose from, including:
                </p>
                <ul className="mb-5">
                  <li>
                    <b>Chronological:</b> Lists your work history in reverse
                    chronological order, starting with your most recent job.
                  </li>
                  <li>
                    <b>Functional:</b> Focuses on your skills and abilities
                    rather than your chronological work history.
                  </li>
                  <li>
                    <b>Combination:</b> Combines elements of both chronological
                    and functional formats, highlighting both your skills and
                    relevant work experience.
                  </li>
                </ul>
                <p className="mb-5">
                  Choose a format that best highlights your strengths and aligns
                  with the job you're applying for.
                </p>

                <h5 className="sub-heading mb-3">
                  3. Include Essential Sections
                </h5>
                <p className="mb-5">
                  A well-structured resume typically includes the following
                  sections:
                </p>
                <ul className="mb-5">
                  <li>
                    <b>Contact Information:</b> Include your full name, phone
                    number, email address, and LinkedIn profile (if applicable).
                  </li>
                  <li>
                    <b>Resume Summary or Objective:</b> A brief statement at the
                    beginning of your resume that summarizes your career goals,
                    skills, and what you can bring to the role.
                  </li>
                  <li>
                    <b>Work Experience:</b> List your work history in reverse
                    chronological order. Include job titles, company names,
                    locations, dates of employment, and bullet points
                    highlighting your accomplishments and responsibilities.
                  </li>
                  <li>
                    <b>Education:</b> Detail your educational background,
                    including degrees earned, institutions attended, and any
                    relevant coursework or academic achievements.
                  </li>
                  <li>
                    <b>Skills:</b> Showcase your relevant skills, such as
                    technical skills, languages, certifications, and soft skills
                    like communication and leadership.
                  </li>
                  <li>
                    <b>Additional Sections (Optional):</b> Depending on your
                    background, you may include sections such as certifications,
                    volunteer work, professional memberships, or projects.
                  </li>
                </ul>

                <h5 className="sub-heading mb-3">
                  Tailor Your Resume to the Job
                </h5>
                <p className="mb-5">
                  Customize your resume for each job application by aligning
                  your skills and experiences with the job requirements.
                  Tailoring your resume demonstrates your genuine interest in
                  the position and increases your chances of standing out to
                  recruiters and hiring managers.
                </p>

                <h5 className="sub-heading mb-3">
                  5. Use Action Words and Quantify Your Achievements
                </h5>
                <p className="mb-5">
                  When describing your work experience and accomplishments, use
                  action verbs (e.g., managed, developed, implemented) to convey
                  your contributions effectively. Where possible, quantify your
                  achievements with numbers or percentages to provide concrete
                  evidence of your impact.
                </p>

                <h5 className="sub-heading mb-3">6. Format and Design</h5>
                <p className="mb-5">
                  Ensure your resume is easy to read and visually appealing:
                </p>
                <ul className="mb-5">
                  <li>
                    Use a clean, professional font (e.g., Arial, Calibri, Times
                    New Roman) and maintain consistent formatting throughout.
                  </li>
                  <li>
                    Use bullet points to organize information and make it easy
                    for recruiters to scan your resume quickly.
                  </li>
                  <li>
                    Avoid excessive use of bold, italics, or underlining, and
                    maintain sufficient white space for readability.
                  </li>
                </ul>

                <h5 className="sub-heading mb-3">Proofread and Edit</h5>
                <p className="mb-5">
                  Before submitting your resume, proofread it carefully to
                  correct any spelling, grammar, or formatting errors. Consider
                  asking a friend or mentor to review it as well, as fresh eyes
                  can often catch mistakes you might overlook.
                </p>

                <img
                  src={Post0301}
                  alt="How to Write a Resume"
                  className="rounded-xl"
                />

                <h5 className="sub-heading mt-5 mb-3">Conclusion</h5>
                <p className="mb-5">
                  A well-crafted resume is your ticket to securing interviews
                  and advancing your career. By following these steps and
                  guidelines for effective resume writing, you can create a
                  compelling document that highlights your qualifications and
                  positions you as a strong candidate for your desired job
                  roles. Remember, your resume should evolve over time as your
                  skills and experiences grow, so be proactive in updating it
                  regularly to reflect your professional growth and
                  achievements.
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

export default Post03;
