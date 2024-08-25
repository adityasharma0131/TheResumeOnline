import { IoCallSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaLink, FaMailchimp } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

import formatDate from "../../../../utils/dateFormator";
// import "./style.css";

const Template = ({ resume }) => {
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
  const skills = resume.skills;
  const hobbies = resume.hobbies;
  const links = resume.links;
  const professions = resume.professions;
  const educations = resume.educations;
  const courses = resume.courses;
  const internships = resume.internship;
  const references = resume.references;
  const extraCurriculars = resume.extraCurricular;
  const customSections = resume.customSections;

  const fullName = `${firstName} ${middleName} ${lastName}`;
  const addressDetails = [address, city, state, zip]
    .filter((detail) => detail)
    .join(", ");

  return (
    <div className="temp-content">
      <div className="user-header">
        {fullName && (
          <div className="user-box">
            <div>
              <h1 className="h1-color">{fullName}</h1>
            </div>
          </div>
        )}
        <div className="user-details">
          {jobTitle && (
            <div className="User-job-title">
              <h3 className="h3-style h3-color">{jobTitle}</h3>
            </div>
          )}

          <div className="user-contact-details small-space">
            {phone && (
              <h3 className="call">
                <IoCallSharp /> {phone && <p>{phone}</p>}
              </h3>
            )}

            {FaMailchimp && (
              <h3 className="email">
                {email && (
                  <p>
                    <IoMdMail />
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                )}
              </h3>
            )}
          </div>
          <div className="user-address small-space address">
            {addressDetails && (
              <h3>
                {addressDetails && (
                  <p>
                    <FaLocationDot />
                    {addressDetails}
                  </p>
                )}
              </h3>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table-detail mediam-space">
        <tbody>
          <tr>
            <td className="col-1" valign="top">
              {summary && (
                <div className="item">
                  <div className="user-summary">
                    <div className="summary-title">
                      <h2 className=" h2-color">Professional Profile</h2>
                      <hr className="divider"></hr>
                    </div>
                  </div>
                  <div className="small-space ">
                    <p>{summary}</p>
                  </div>
                </div>
              )}
            </td>
            <td className="col-2" valign="top">
              <div className="temp-section ">
                <div className="user-education">
                  <div className="education-title">
                    <h2 className=" h2-color">Personal Details</h2>
                    <hr className="divider"></hr>
                  </div>
                </div>

                <div className="temp-item edu-h small-space">
                  <div className="temp-item-head edu-h-2">
                    {drivingLicense && (
                      <p className="small-space">
                        Driving Licenses - <b>{drivingLicense}</b>
                      </p>
                    )}

                    {nationality && (
                      <p className="small-space">
                        Nationaliy - <b>{nationality}</b>
                      </p>
                    )}

                    {placeOfBirth && (
                      <p className="small-space">
                        Place of Birth - <b>{placeOfBirth}</b>
                      </p>
                    )}

                    {dateOfBirth && (
                      <p className="small-space">
                        Date of Birth - <b>{formatDate(dateOfBirth)}</b>
                      </p>
                    )}

                    {gender && (
                      <p className="small-space">
                        Gender - <b>{gender}</b>
                      </p>
                    )}

                    {maritalStatus && (
                      <p className="small-space">
                        Marital Status - <b>{maritalStatus}</b>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Education  */}
      {educations.length > 0 && (
        <div className="temp-section mediam-space ">
          <div className="user-experience">
            <div className="experience-title">
              <h2 className=" h2-color">Education</h2>
              <hr className="divider"></hr>
            </div>
          </div>
          {educations.map((item, index) => (
            <table key={index} className="experience-tabel small-space">
              <tbody>
                <tr>
                  <td className="col-first" valign="top">
                    <div>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                    </div>
                  </td>
                  <td className="col-second" valign="top">
                    <div className="temp-item exp-part ">
                      <div className="temp-item-head experience-position">
                        <h5 className="h6-color">
                          <b>{item.school} </b>
                        </h5>
                        <h6>
                          | {item.degree}, {item.city}
                        </h6>
                      </div>
                      <p className="exp-desc small-space">{item.description}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}

      {/* experience  */}
      {professions.length > 0 && (
        <div className="temp-section mediam-space ">
          <div className="user-experience">
            <div className="experience-title">
              <h2 className=" h2-color">Professional Experiene</h2>
              <hr className="divider"></hr>
            </div>
          </div>
          {professions.map((item, index) => (
            <table key={index} className="experience-tabel small-space">
              <tbody>
                <tr>
                  <td className="col-first" valign="top">
                    <div>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                    </div>
                  </td>
                  <td className="col-second" valign="top">
                    <div className="temp-item exp-part ">
                      <div className="temp-item-head experience-position">
                        <h5 className="h6-color">
                          <b>{item.title} </b>
                        </h5>
                        <h6>
                          | {item.employer}, {item.city}
                        </h6>
                      </div>
                      <p className="exp-desc small-space">{item.description}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}

      {/* Internship  */}
      {internships.length > 0 && (
        <div className="temp-section mediam-space ">
          <div className="user-experience">
            <div className="experience-title">
              <h2 className=" h2-color">Internship</h2>
              <hr className="divider"></hr>
            </div>
          </div>
          {internships.map((item, index) => (
            <table key={index} className="experience-tabel small-space">
              <tbody>
                <tr>
                  <td className="col-first" valign="top">
                    <div>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                    </div>
                  </td>
                  <td className="col-second" valign="top">
                    <div className="temp-item exp-part ">
                      <div className="temp-item-head experience-position">
                        <h5 className="h6-color">
                          <b>{item.title} </b>
                        </h5>

                        <h6>
                          | {item.employer}, {item.city}
                        </h6>
                      </div>
                      <p className="exp-desc small-space">{item.description}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}

      {/* Courses   */}
      {courses.length > 0 && (
        <div className="temp-section mediam-space ">
          <div className="user-experience">
            <div className="experience-title">
              <h2 className=" h2-color">Courses</h2>
              <hr className="divider"></hr>
            </div>
          </div>
          {courses.map((item, index) => (
            <table key={index} className="experience-tabel small-space">
              <tbody>
                <tr>
                  <td className="col-first" valign="top">
                    <div>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                    </div>
                  </td>
                  <td className="col-second" valign="top">
                    <div className="temp-item exp-part ">
                      <div className="temp-item-head experience-position">
                        <h5 className="h6-color">
                          <b>{item.title}</b>
                        </h5>

                        <h6>
                          | {item.employer} {item.city}
                        </h6>
                      </div>
                      <p className="exp-desc small-space">{item.description}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      )}

      {/* Extra Curricular */}
      <div className="temp-section mediam-space ">
        <div className="user-experience">
          <div className="experience-title">
            <h2 className=" h2-color">Extra Curricular</h2>
            <hr className="divider"></hr>
          </div>
        </div>
        {extraCurriculars.map((item, index) => (
          <table key={index} className="experience-tabel small-space">
            <tbody>
              <tr>
                <td className="col-first" valign="top">
                  <div>
                    <span>
                      {formatDate(item.startDate)}, {formatDate(item.endDate)}
                    </span>
                  </div>
                </td>
                <td className="col-second" valign="top">
                  <div className="temp-item exp-part ">
                    <div className="temp-item-head experience-position">
                      <h5 className="h6-color">
                        <b>{item.title}</b>
                      </h5>
                      <h6>
                        | {item.employer}, {item.city}
                      </h6>
                    </div>
                    <p className="exp-desc small-space">{item.description}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      {/* Custom Curricular */}
      <div className="temp-section mediam-space ">
        <div className="user-experience">
          <div className="experience-title">
            <h2 className=" h2-color">Custom Section</h2>
            <hr className="divider"></hr>
          </div>
        </div>
        {customSections.map((item, index) => (
          <table key={index} className="experience-tabel small-space">
            <tbody>
              <tr>
                <td className="col-first" valign="top">
                  <div>
                    <span>
                      {formatDate(item.startDate)}, {formatDate(item.endDate)}
                    </span>
                  </div>
                </td>
                <td className="col-second" valign="top">
                  <div className="temp-item exp-part ">
                    <div className="temp-item-head experience-position">
                      <h5 className="h6-color">
                        <b>{item.title}</b>
                      </h5>
                      <h6>
                        | {item.employer}, {item.city}
                      </h6>
                    </div>
                    <p className="exp-desc small-space">{item.description}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      {/* skills */}
      {skills.length > 0 && (
        <div className="temp-section mediam-space  ">
          <div className="user-skills">
            <div className="skill-title">
              <h2 className=" h2-color">Additional Skills</h2>
              <hr className="divider"></hr>
            </div>
          </div>

          <div className="temp-item ">
            <div className="temp-item-head skill-s small-space">
              <h5>
                {skills.map((item, index) => (
                  <b key={index}> {item.skill}</b>
                ))}
              </h5>
              <div className="side-item-rating lang-star">
                {/* {Array.from({ length: item.level }).map((_, i) => (
                   <FaStar key={i} />
                 ))} */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <div className="side-item mediam-space">
          <div className="user-hobbies">
            <div className="hobbies-title">
              <h2 className=" h2-color">Hobbies</h2>
              <hr className="divider"></hr>
            </div>
          </div>

          <div className="side-item-point small-space">
            <div className="hobbie-part">
              <h5>
                {hobbies.map((item, index) => (
                  <b key={index}>
                    {" "}
                    <span>{item.label}</span>
                  </b>
                ))}
              </h5>
            </div>
          </div>
        </div>
      )}

      {/* reference */}
      {references.length > 0 && (
        <div className="temp-section mediam-space ">
          <div className="user-reference">
            <div className="reference-title">
              <h2 className=" h2-color">Reference</h2>
              <hr className="divider"></hr>
            </div>
          </div>

          {references.map((item, index) => (
            <div
              key={index}
              className="temp-item reference-details   small-space "
            >
              <div className="temp-item-head ">
                <h5>
                  <b>{item.references}</b>
                </h5>
                <h5 className="h6-color">
                  <b>{item.company}</b>
                </h5>
              </div>
              <h5>
                <b>{item.referenceFullname}</b>
              </h5>{" "}
              <h5>
                <b>{item.phone}</b>
              </h5>
              <h5>
                <b>{item.email}</b>
              </h5>
            </div>
          ))}
        </div>
      )}

      {/* Language */}
      {languages.length > 0 && (
        <div className="side-item mediam-space">
          <div className="user-language">
            <div className="language-title">
              <h2 className=" h2-color">Language</h2>
              <hr className="divider"></hr>
            </div>
          </div>

          {languages.map((item, index) => (
            <div className="side-item-point language-part" key={index}>
              <div className="lan-col">
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
      )}

      {/* social media */}
      {links.length > 0 && (
        <div className="side-item mediam-space">
          <div className="user-skills">
            <div className="skill-title">
              <h2 className=" h2-color">Social Links</h2>
              <hr className="divider"></hr>
            </div>
          </div>
          <div className="social pt-2">
            <div className="side-item-point social-part">
              {links.map((item, index) => (
                <div className="side-item-point" key={index}>
                  <a href={item.link} target="_blank">
                    <FaLink />
                    {item.link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
