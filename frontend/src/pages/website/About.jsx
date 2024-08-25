import {
  AboutImg,
  WhyChooseUsImg,
  Icon01,
  Icon02,
  Icon03,
} from "../../static/images/about";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="section hero about-hero pb-8">
        <div className="container">
          <div className="text">
            <h5>ABOUT US</h5>
            <h4>Unleash Your Career Potential With TheResume!</h4>
            <p className="mb-8">
              Welcome to TheResume, where we specialize in transforming your
              career aspirations into compelling resumes that stand out. At
              TheResume, we understand that your resume is more than just a
              document; it's your professional story, your gateway to new
              opportunities.
            </p>
          </div>
          <div className="image">
            <img src={AboutImg} alt="Resume" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-text pb-0">
        <div className="container">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h5 className="title-alt mb-4">
                Ready To Ditch The Resume Blues and Land Your Dream Job?
              </h5>
              <p>
                TheResume is here to turn your career aspirations into resume
                magic that gets you noticed!
              </p>
            </div>
            <div>
              <h5 className="title-alt mb-4">
                We Don't Just Help Write Resumes, We Craft Powerful Career
                Stories.
              </h5>
              <p>
                Your resume is your golden ticket to new opportunities, and
                we'll make sure it shines brighter than the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta about-choose bg-light pt-0">
        <div className="image">
          <img src={WhyChooseUsImg} alt="Why Choose Us" />
        </div>
        <div className="container">
          <div className="text">
            <h4 className="title mb-8">Why Choose TheResume?</h4>
            <ul>
              <li>
                <b>Stand Out From the Crowd:</b>
                <span>
                  Our expert resume writers are resume rockstars! They'll help
                  you create a resume that stands out, no matter where you're
                  applying.
                </span>
              </li>
              <li>
                <b>Personalized for You:</b>
                <span>
                  Every career journey is one-of-a-kind. Whether you're a
                  seasoned pro ready to conquer the next level or a fresh
                  graduate embarking on your professional odyssey, we'll help
                  you tailor your resume to showcase your unique skills and
                  achievements.
                </span>
              </li>
              <li>
                <b>Expertise You Can Trust: </b>
                <span>
                  We're resume ninjas with years of experience and a finger on
                  the pulse of the latest hiring trends. Your resume will be a
                  masterpiece that grabs the attention of recruiters and hiring
                  managers.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* About Icons */}
      <section className="section about-icons">
        <div className="container">
          <div className="grid grid-cols-3 gap-20">
            <div className="col">
              <div className="about-item">
                <div className="head">
                  <div className="icon">
                    <img src={Icon01} alt="" />
                  </div>
                  <h5>Your Success Is Our Passion!</h5>
                </div>
                <div className="body">
                  <p>
                    At TheResume, we're obsessed with your success. We don't
                    settle for "good enough" - we create resumes that exceed
                    your expectations and open doors to exciting possibilities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="about-item">
                <div className="head">
                  <div className="icon">
                    <img src={Icon02} alt="" />
                  </div>
                  <h5>Ready To Launch Your Career Takeoff?</h5>
                </div>
                <div className="body">
                  <p>
                    Let TheResume be your co-pilot! We'll craft a resume that
                    gets you noticed and positions you for the success you
                    deserve. Join countless others who have transformed their
                    careers with TheResume!
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="about-item">
                <div className="head">
                  <div className="icon">
                    <img src={Icon03} alt="" />
                  </div>
                  <h5>
                    Craft Your Dream Job. Build Your Future. It Starts Here.
                  </h5>
                </div>
                <div className="body">
                  <p>
                    Don't Wait! Transform Your Career Trajectory Today With
                    TheResume - Where Your Professional Journey Takes Flight!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
