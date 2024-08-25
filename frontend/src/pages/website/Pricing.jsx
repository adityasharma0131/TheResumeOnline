import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Breadcrumb } from "../../components";
import { FAQImg } from "../../static/images/home";
import { B2BLogo, MLLogo } from "../../static/images/clients";

const Pricing = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const data = [
    {
      title: "Are there any hidden costs?",
      content:
        "No, there are no hidden costs. The total price for your selected period will be clearly displayed before you enter any payment details, excluding bank transfer fees.",
    },
    {
      title: "Can I change my plan?",
      content:
        "Yes, you can upgrade, downgrade, or cancel your plan at anytime.",
    },
    {
      title: "Is my payment information secure?",
      content: "Yes, all transactions are 100% secure.",
    },
    {
      title: "What format will the documents be saved in?",
      content:
        "All documents are saved as PDFs and DOCX for enhanced security, readability, and consistent visual presentation across all devices.",
    },
    {
      title: "Can I upgrade from a Basic to a Premium account at any time?",
      content:
        "Yes, you can upgrade your account from Basic to Premium at any time. Simply navigate to the upgrade option in your account settings.",
    },
    {
      title:
        "What support options are available if I encounter issues with my account?",
      content:
        "We provide customer support through our email. Our support team is ready to assist you with any issues or questions you may have about your account or our services.",
    },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Pricing */}
      <section className="section pricing">
        <div className="container">
          <div className="text-center">
            <h2 className="title-alt">Pricing</h2>
            <h1 className="title mb-10">Pricing for TheResumes</h1>
          </div>
          <div className="grid grid-cols-4 gap-8">
            <div className="col">
              <div className="pricing-card">
                <div className="head">
                  <h3>Basic</h3>
                  <div className="price">
                    <h5>&#8377; 99</h5>
                    <h6>1 Time Access</h6>
                    <p>Single Template Download</p>
                  </div>
                  <button className="button">Get Started</button>
                </div>
                <div className="body">
                  <ul className="list">
                    <li>
                      <FaCheck />
                      <span>
                        Generate limitless resumes and captivating cover
                        letters!
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Experience a single exhilarating download opportunity.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Easily create matching cover letters for a cohesive
                        look.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Craft a powerful one-page resume that dazzles.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>Enjoy a hassle-free, one-time payment.</span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>Downloads in multiple formats (PDF and DOCX)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="pricing-card">
                <div className="head">
                  <h3>Executive </h3>
                  <div className="price">
                    <h5>&#8377; 125</h5>
                    <h6>7 Days</h6>
                    <p>Unlimited Access</p>
                  </div>
                  <button className="button">Get Started</button>
                </div>
                <div className="body">
                  <ul className="list">
                    <li>
                      <FaCheck />
                      <span>
                        Generate limitless resumes and captivating cover
                        letters!
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Access all premium templates and vibrant colors.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Easily create matching cover letters for a cohesive
                        look.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Choose from dozens of sleek and professional designs.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Make a one-time payment—no need to worry about canceling
                        subscriptions!
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>Downloads in multiple formats (PDF and DOCX)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="pricing-card">
                <div className="head">
                  <h3>Pro</h3>
                  <div className="price">
                    <div className="tag">Best Seller</div>
                    <h5>&#8377; 199/m</h5>
                    <h6>30 Days</h6>
                    <p>Unlimited Access</p>
                  </div>
                  <button className="button">Get Started</button>
                </div>
                <div className="body">
                  <ul className="list">
                    <li>
                      <FaCheck />
                      <span>
                        Generate limitless resumes and captivating cover
                        letters!
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Access all premium templates and vibrant colors.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Easily create matching cover letters for a cohesive
                        look.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Choose from dozens of sleek and professional designs.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Make a one-time payment—no need to worry about canceling
                        subscriptions!
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>Downloads in multiple formats (PDF and DOCX)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="pricing-card">
                <div className="head">
                  <h3>Elite</h3>
                  <div className="price">
                    <h5>&#8377; 999</h5>
                    <h6>1 Year </h6>
                    <p>Unlimited Access</p>
                  </div>
                  <button className="button">Get Started</button>
                </div>
                <div className="body">
                  <ul className="list">
                    <li>
                      <FaCheck />
                      <span>
                        Generate limitless resumes and captivating cover
                        letters!
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Access all premium templates and vibrant colors.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Easily create matching cover letters for a cohesive
                        look.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Choose from dozens of sleek and professional designs.
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>
                        Make a one-time payment—no need to worry about canceling
                        subscriptions!
                      </span>
                    </li>
                    <li>
                      <FaCheck />
                      <span>Downloads in multiple formats (PDF and DOCX)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section clients bg-light-alt">
        <div className="container">
          <div className="text-center mb-8">
            <h4 className="title-alt">Clients</h4>
            <h3 className="title">Our Valued Clients</h3>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <img src={B2BLogo} alt="" />
              </div>
              <div>
                <img src={MLLogo} alt="" />
              </div>
              <div>
                <img src={B2BLogo} alt="" />
              </div>
              <div>
                <img src={MLLogo} alt="" />
              </div>
              <div>
                <img src={B2BLogo} alt="" />
              </div>
              <div>
                <img src={MLLogo} alt="" />
              </div>
              <div>
                <img src={B2BLogo} alt="" />
              </div>
              <div>
                <img src={MLLogo} alt="" />
              </div>
              <div>
                <img src={B2BLogo} alt="" />
              </div>
              <div>
                <img src={MLLogo} alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq pricing-faq" id="faq">
        <div className="image">
          <img src={FAQImg} alt="" />
        </div>
        <div className="container">
          <div className="grid grid-cols-2">
            <div>
              <div className="text">
                <h5 className="title mb-4">Frequently Asked Questions</h5>
                <p className="mb-8">
                  Common questions customers have and is useful to customers at
                  all stages of the customer journey. FAQs start with a question
                  and then answer it concisely.
                </p>
                <div className="accordion">
                  {data.map((item, index) => (
                    <div key={index} className="accordion-item">
                      <div
                        className={`accordion-title ${
                          activeIndex === index ? "active" : ""
                        }`}
                        onClick={() => handleToggle(index)}
                      >
                        <span>{item.title}</span>
                        {activeIndex === index ? <FaMinus /> : <FaPlus />}
                      </div>
                      <div
                        className={`accordion-content ${
                          activeIndex === index ? "show" : ""
                        }`}
                      >
                        <p style={{ whiteSpace: "pre-line" }}>{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
