import { FaStar } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

import formatDate from "../../../../utils/dateFormator";
// import "./style.css";

const ResumeDefaultTemplate = ({ resume }) => {
  const {
    jobTitle,
    firstName,
    middleName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    drivingLicense,
    nationality,
    placeOfBirth,
    dateOfBirth,
    gender,
    maritalStatus,
    summary,
    photo,
  } = resume.personalDetail;
  const languages = resume.languages;
  const hobbies = resume.hobbies;
  const links = resume.links;
  const professions = resume.professions;
  const educations = resume.educations;
  const courses = resume.courses;
  const internships = resume.internship;
  const skills = resume.skills;
  const reference = resume.references;
  const extraCurricular = resume.extraCurricular;
  const customSections = resume.customSections;

  const fullName = `${firstName} ${middleName} ${lastName}`;
  const addressDetails = [address, city, state, zip]
    .filter((detail) => detail)
    .join(", ");

  return (
    <div className="temp-content">
      <div>
        <h1 className="h1-color">{fullName}</h1>
        <hr className="divider-1"></hr>
        <h3 className="h3-style">{jobTitle}</h3>
        <div className="contact-details small-space">
          <h3 className="call">
            <IoCallSharp /> {phone && <p>{phone}</p>}
          </h3>
          <h3 className="email">
            {email && (
              <p>
                <IoMdMail />
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
          </h3>
          <h3 className="social">
            {links.map((item, index) => (
              <div className="side-item-point" key={index}>
                <a href={item.link} target="_blank">
                  <FaLinkedin />
                  {item.link}
                </a>
              </div>
            ))}
          </h3>
        </div>
        <div className="small-space address">
          <h3>
            {addressDetails && (
              <p>
                <FaLocationDot />
                {addressDetails}
              </p>
            )}
          </h3>
        </div>
      </div>

      {/* Table */}
      <table className="table-detail mediam-space">
        <tbody>
          <tr>
            <td className="col-1" valign="top">
              <div className="item">
                <h2 className="side-title h2-color">Summary</h2>
                <hr className="divider"></hr>
                {summary && <p>{summary}</p>}
                {/* <hr /> */}
              </div>
              <div className="temp-section mediam-space ">
                <h2 className="temp-heading h2-color">Experience</h2>
                <hr className="divider"></hr>

                {professions.map((item, index) => (
                  <div key={index} className="temp-item exp-part small-space">
                    <div className="temp-item-head exp-part-2">
                      <h5>
                        <b>{item.title}</b>
                      </h5>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                      <h6>
                        {item.employer}, {item.city}
                      </h6>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="temp-section mediam-space">
                <h2 className="temp-heading h2-color">Internship History</h2>
                <hr className="divider"></hr>
                {internships.map((item, index) => (
                  <div key={index} className="temp-item small-space">
                    <div className="temp-item-head">
                      <h5>
                        <b>{item.title}</b>
                      </h5>
                      <div>
                        {" "}
                        <span>
                          {formatDate(item.startDate)},{" "}
                          {formatDate(item.endDate)}
                        </span>
                      </div>
                      <h6>
                        {item.employer}, {item.city}
                      </h6>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="temp-section mediam-space">
                <h2 className="temp-heading h2-color">Courses History</h2>
                <hr className="divider"></hr>
                {courses.map((item, index) => (
                  <div key={index} className="temp-item small-space">
                    <div className="temp-item-head">
                      <h5>
                        <b>{item.title}</b>
                      </h5>
                      <div>
                        <span>
                          {formatDate(item.startDate)},{" "}
                          {formatDate(item.endDate)}
                        </span>
                      </div>
                      <h6>
                        {item.institute}, {item.city}
                      </h6>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="temp-section ">
                <h2 className="temp-heading h2-color">Custom Sections</h2>
                <hr className="divider"></hr>

                {customSections.map((item, index) => (
                  <div key={index} className="temp-item edu-h small-space ">
                    <div className="temp-item-head edu-h-2">
                      <h5>
                        <b>{item.title}</b>
                      </h5>
                      <h5 className=" emp-city">
                        <h6>
                          <b>{item.city}</b>
                        </h6>
                      </h5>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </td>
            <td className="col-2" valign="top">
              <div className="temp-section ">
                <h2 className="temp-heading h2-color">Education</h2>
                <hr className="divider"></hr>

                {educations.map((item, index) => (
                  <div key={index} className="temp-item edu-h small-space">
                    <div className="temp-item-head edu-h-2">
                      <h5>
                        <b>{item.degree}</b>
                        <span>
                          {formatDate(item.startDate)},{" "}
                          {formatDate(item.endDate)}
                        </span>
                      </h5>
                      <h6>
                        {item.school}, {item.city}
                      </h6>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              {/* skills */}
              <div className="temp-section mediam-space  ">
                <h2 className="temp-heading h2-color">Skills</h2>
                <hr className="divider"></hr>

                {skills.map((item, index) => (
                  <div key={index} className="temp-item ">
                    <div className="temp-item-head skill-s">
                      <h5>
                        <b>{item.skill}</b>
                      </h5>
                      <div className="side-item-rating lang-star">
                        {/* {Array.from({ length: item.level }).map((_, i) => (
                          <FaStar key={i} />
                        ))} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="side-item mediam-space">
                <h2 className="side-title h2-color">Hobbies</h2>
                <hr className="divider" />

                {hobbies.map((item, index) => (
                  <div className="side-item-point" key={index}>
                    <h5>
                      <b>
                        {" "}
                        <span>{item.label}</span>
                      </b>
                    </h5>
                  </div>
                ))}
              </div>
              {/*  */}
              <div className="temp-section mediam-space ">
                <h2 className="temp-heading h2-color">Refernce</h2>
                <hr className="divider"></hr>

                {reference.map((item, index) => (
                  <div key={index} className="temp-item small-space ">
                    <div className="temp-item-head skill-s">
                      <h5>
                        <b>{item.references}</b>
                      </h5>
                    </div>
                    <div className="company-name">
                      <h5>
                        <b>{item.referenceFullname}</b>
                      </h5>
                      <h5>
                        <b>{item.company}</b>
                      </h5>
                    </div>
                    <div className="phone-e">
                      {" "}
                      <h5>
                        <b>{item.phone}</b>
                      </h5>
                      <h5>
                        <b>{item.email}</b>
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
              <div className="temp-section mediam-space">
                <h2 className="temp-heading h2-color">Extra Curricular</h2>
                <hr className="divider"></hr>

                {extraCurricular.map((item, index) => (
                  <div key={index} className="temp-item edu-h small-space">
                    <div className="temp-item-head edu-h-2">
                      <h5>
                        <b>{item.title}</b>
                      </h5>
                      <h5 className=" emp-city">
                        <b>{item.employer}</b>
                        <h6>
                          <b>{item.city}</b>
                        </h6>
                      </h5>

                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="side-item mediam-space">
                <h2 className="temp-heading h2-color">Languages</h2>
                <hr className="divider"></hr>

                {languages.map((item, index) => (
                  <div className="side-item-point skill-s" key={index}>
                    <div>
                      <span>{item.label}</span>
                    </div>
                    <div className="side-item-rating lang-star">
                      {Array.from({ length: item.level }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="side-item mediam-space">
                <h2 className="temp-heading h2-color">Personal Detail</h2>
                <hr className="divider"></hr>

                {addressDetails && (
                  <p className="temp-contact-info">
                    Address
                    <span>{addressDetails}</span>
                  </p>
                )}
                {drivingLicense && (
                  <p className="temp-contact-info">
                    Driving License
                    <span>{drivingLicense}</span>
                  </p>
                )}
                {nationality && (
                  <p className="temp-contact-info">
                    Nationality
                    <span>{nationality}</span>
                  </p>
                )}
                {placeOfBirth && (
                  <p className="temp-contact-info">
                    Place Of Birth
                    <span>{placeOfBirth}</span>
                  </p>
                )}
                {dateOfBirth && (
                  <p className="temp-contact-info">
                    Date Of Birth
                    <span>{formatDate(dateOfBirth)}</span>
                  </p>
                )}
                {gender && (
                  <p className="temp-contact-info">
                    Gender
                    <span>{gender}</span>
                  </p>
                )}
                {maritalStatus && (
                  <p className="temp-contact-info">
                    Marital Status
                    <span>{maritalStatus}</span>
                  </p>
                )}
                {photo && <img src={photo} />}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResumeDefaultTemplate;
