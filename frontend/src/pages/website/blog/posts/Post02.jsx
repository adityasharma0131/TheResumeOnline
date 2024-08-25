import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Breadcrumb } from "../../../../components";
import BlogPostList from "../blog-post-list";
import {
  Post02Cover,
  Post0201,
  Post0202,
  Post0203,
  CreateResumeBtn,
} from "../../../../static/images/blog";

const Post02 = () => {
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
                  Mastering the Art of Thank You Notes in the Workplace.
                </h1>
                <img
                  src={Post02Cover}
                  alt="Mastering the Art of Thank You Notes in the Workplace."
                  className="rounded-xl"
                />
                <p className="mt-5 mb-5">
                  In today's fast-paced professional world, expressing gratitude
                  through thank you notes remains a timeless gesture that not
                  only shows appreciation but also enhances relationships and
                  fosters goodwill. Whether you're following up after an
                  interview or acknowledging support from colleagues, mastering
                  the art of thank you notes can significantly impact your
                  career journey. Let's explore how you can effectively craft
                  and send impactful thank you notes in various workplace
                  scenarios.
                </p>

                <img
                  src={Post0201}
                  alt="Mastering the Art of Thank You Notes in the Workplace."
                  className="rounded-xl"
                />

                <h5 className="sub-heading mb-3">
                  Purpose of a Thank You Note
                </h5>
                <p className="mb-5">
                  Thank you notes serve multiple purposes in the workplace. They
                  are particularly crucial after job interviews, where they
                  reinforce your interest in the position and show appreciation
                  for the interviewer's time and insights. Additionally, sending
                  thank you notes to colleagues or clients who have offered
                  support or assistance can strengthen relationships and
                  maintain positive communication channels.
                </p>

                <h5 className="sub-heading mb-3">
                  Main Elements of Thank You Notes
                </h5>
                <p className="mb-5">
                  A well-crafted thank you note typically includes the following
                  elements:
                </p>
                <ul className="mb-5">
                  <li>
                    <b>Personalized Message:</b> Keep it concise, typically less
                    than a page, starting with a greeting and expressing
                    gratitude or appreciation. Conclude with a professional
                    closing such as "Sincerely" or "I look forward to working
                    with you."
                  </li>
                  <li>
                    <b>Contact Information:</b> Include your name, phone number,
                    or use personalized letterhead to facilitate easy follow-up
                    without additional research.
                  </li>
                  <li>
                    <b>Signature:</b> Sign your full name to add a personal
                    touch, especially if you've recently met the recipient.
                  </li>
                </ul>

                <img
                  src={Post0202}
                  alt="Mastering the Art of Thank You Notes in the Workplace."
                  className="rounded-xl"
                />

                <h5 className="sub-heading mt-5 mb-3">
                  How to Send a Perfect Thank You Note
                </h5>
                <p className="mb-5">
                  Sending a perfect thank you note involves attention to detail
                  and thoughtful execution:
                </p>

                <ul className="ms-5">
                  <li>
                    <b>Addressing:</b> Ensure accuracy in recipient details,
                    referencing business cards or official sources to spell
                    names correctly and verify titles.
                  </li>
                  <li>
                    <b>Materials:</b> Opt for quality paper and pens. If
                    uncertain, choose a store-bought thank you card that
                    reflects professionalism.
                  </li>
                  <li>
                    <b>Uniqueness:</b> Each thank you note should be unique in
                    its content and approach. If you've sent a digital thank
                    you, ensure the physical note varies to avoid repetition.
                  </li>
                  <li>
                    <b>Envelope Details:</b> Include a return address and
                    accurately address the envelope using the recipient's
                    preferred name and title.
                  </li>
                  <li>
                    <b>Double-Check:</b> Verify each envelope corresponds
                    correctly with its note to prevent any errors that could
                    diminish the impact of your gesture.
                  </li>
                  <li>
                    <b>Business Card Inclusion:</b> Enclose your business card
                    for easy contact information retrieval, further enhancing
                    professional communication.
                  </li>
                </ul>

                <img
                  src={Post0203}
                  alt="Mastering the Art of Thank You Notes in the Workplace."
                  className="rounded-xl"
                />

                <h5 className="sub-heading mb-3">
                  Tips for Writing Effective Thank You Notes
                </h5>
                <ol className="mb-5">
                  <li>
                    <b>Be Prompt:</b> Send your thank you note within 24-48
                    hours after the event or interaction to maintain relevance
                    and sincerity.
                  </li>
                  <li>
                    <b>Be Specific:</b> Reference specific details from the
                    interview or interaction to personalize your message and
                    demonstrate attentiveness.
                  </li>
                  <li>
                    <b>Keep it Professional:</b> Maintain a formal tone
                    appropriate to the workplace environment while expressing
                    genuine appreciation.
                  </li>
                  <li>
                    <b>Proofread:</b> Double-check your note for any grammatical
                    errors or typos that could detract from its professionalism.
                  </li>
                </ol>
                <h5 className="sub-heading mb-3">Conclusion</h5>
                <p>
                  Sending thoughtful thank you notes is more than a gesture;
                  it's a strategic way to cultivate relationships, reinforce
                  professionalism, and leave a lasting positive impression in
                  the workplace. Whether you're navigating job interviews,
                  expressing gratitude to colleagues, or maintaining client
                  relations, mastering the art of thank you notes can
                  distinguish you as a proactive and appreciative professional.
                  By incorporating these tips into your practice, you'll not
                  only enhance your professional reputation but also contribute
                  to a positive and respectful workplace culture.
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

export default Post02;
