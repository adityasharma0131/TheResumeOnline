import { FaMailchimp } from "react-icons/fa6";

import formatDate from "../../../../utils/dateFormator";
import { DummyUser } from "../../../../static/images/users";
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
      {/* Table */}
      <table className="table-detail mediam-space">
        <tbody>
          <tr>
            {/* First Table  */}
            <td className="col-1" valign="top">
              <div className="user-profile">
                <div className="profile-image">
                  {photo && <img src={photo} alt={fullName} />}
                  {!photo && <img src={DummyUser} alt={fullName} />}
                </div>
              </div>
              <div className="user-header text-center padding-all">
                <div>
                  <div className="pr-gender small-space">
                    {gender && (
                      <p className="text-left">
                        Gender - <b>{gender}</b>
                      </p>
                    )}
                  </div>
                </div>
                <div className="user-personal text-left">
                  <div className="pr-driving small-space">
                    {drivingLicense && (
                      <p className="text-left">
                        Driving Licenses - <b>{drivingLicense}</b>
                      </p>
                    )}
                  </div>
                  <div className="pr-nationality small-space">
                    {nationality && (
                      <p className="text-left">
                        Nationaliy - <b>{nationality}</b>
                      </p>
                    )}
                  </div>
                  <div className="pr-nationality small-space">
                    {dateOfBirth && (
                      <p className="text-left">
                        Date of Birth - <b>{formatDate(dateOfBirth)}</b>
                      </p>
                    )}
                  </div>
                  <div className="pr-nationality small-space">
                    {placeOfBirth && (
                      <p className="text-left">
                        Place of Birth - <b>{placeOfBirth}</b>
                      </p>
                    )}
                  </div>
                  <div className="pr-nationality small-space">
                    {maritalStatus && (
                      <p className="text-left">
                        Maratial Status - <b>{maritalStatus}</b>
                      </p>
                    )}
                  </div>
                  <div className="pr-nationality small-space">
                    {addressDetails && (
                      <p className="text-left">
                        <b>{addressDetails}</b>
                      </p>
                    )}
                  </div>
                </div>

                <div className="user-contact-details small-space">
                  {phone && (
                    <h3 className="call text-left">
                      {phone && <p>{phone}</p>}
                    </h3>
                  )}
                </div>
              </div>
              <div className="mail-id">
                {FaMailchimp && (
                  <h3 className="email">
                    {email && (
                      <p>
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                    )}
                  </h3>
                )}
              </div>
              {/* Summary */}
              <div className="padding-all">
                <div className="item">
                  <h2 className="side-title h2-color">Summary</h2>
                  {/* <hr className="divider"></hr> */}
                  {summary && <p className="about-user color-h5">{summary}</p>}
                  {/* <hr /> */}
                </div>
                {/* skills */}
                <div className="temp-section small-space ">
                  <h2 className="temp-heading h2-color">Skills</h2>
                  {/* <hr className="divider"></hr> */}

                  <div className="temp-item ">
                    <div className="temp-item-head about-user skill-s">
                      <h5 className="color-h5">
                        {skills.map((item, index) => (
                          <b key={index}>{item.skill}</b>
                        ))}
                      </h5>
                      {/* <div className="side-item-rating lang-star">
                      {Array.from({ length: item.level }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div> */}
                    </div>
                  </div>
                </div>

                {/* course history */}
                <div className="temp-section mediam-space">
                  <h2 className="temp-heading h2-color">Courses History</h2>
                  {/* <hr className="divider"></hr> */}
                  {courses.map((item, index) => (
                    <div
                      key={index}
                      className="temp-item  about-user small-space color-h5"
                    >
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
                {/*Hobbies  */}
                <div className="side-item mediam-space ">
                  <h2 className="side-title h2-color">Hobbies</h2>
                  {/* <hr className="divider" /> */}

                  <div className="side-item-point hobbie-desc  about-user color-h5 small-space">
                    <h5>
                      {hobbies.map((item, index) => (
                        <b key={index}>
                          <span>{item.label}</span>
                        </b>
                      ))}
                    </h5>
                  </div>
                </div>

                {/* Languages */}
                <div className="side-item mediam-space">
                  <h2 className="temp-heading h2-color">Languages</h2>
                  {/* <hr className="divider"></hr> */}

                  <div className="side-item-point about-user skill-s color-h5">
                    <div className="language-desc small-space">
                      {languages.map((item, index) => (
                        <span key={index}>{item.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </td>
            {/* Second Tables */}
            <td className="col-2" valign="top">
              <div className="user-details ">
                {fullName && (
                  <div className="user-box">
                    <div>
                      <h1 className="h1-color">{fullName}</h1>
                    </div>
                  </div>
                )}
                {jobTitle && (
                  <div className="User-job-title">
                    <h3 className="h3-style h3-color">{jobTitle}</h3>
                  </div>
                )}
              </div>
              <div className="second-section">
                {/* Education */}
                <div className="temp-section user-title-bg">
                  <h2 className="temp-heading   h2-color">Education</h2>
                  {/* <hr className="divider"></hr>  */}

                  {educations.map((item, index) => (
                    <div
                      key={index}
                      className="temp-item about-user  small-space"
                    >
                      <div className="temp-item-head ">
                        <h5 className="title-date">
                          <b>{item.degree}</b>
                          <span>
                            {formatDate(item.startDate)},{" "}
                            {formatDate(item.endDate)}
                            <hr className="divider"></hr>
                          </span>
                        </h5>
                        <h6>
                          {item.school}, {item.city}
                        </h6>
                      </div>
                      <p>{item.description}</p>
                      <hr className="divider small-space"></hr>
                    </div>
                  ))}
                </div>
                {/* Experience */}
                <div className="temp-section  user-title-bg small-space">
                  <h2 className="temp-heading h2-color">Experience</h2>

                  {professions.map((item, index) => (
                    <div
                      key={index}
                      className="temp-item about-user exp-part small-space"
                    >
                      <div className="temp-item-head exp-part-2">
                        <h5 className="title-date">
                          <b>{item.title}</b>
                          <span>
                            {formatDate(item.startDate)},{" "}
                            {formatDate(item.endDate)}
                            <hr className="divider"></hr>
                          </span>
                        </h5>
                        <h6>
                          {item.employer}, {item.city}
                        </h6>
                      </div>
                      <p>{item.description}</p>
                      <hr className="divider small-space"></hr>
                    </div>
                  ))}
                </div>
                {/* Extra Curricular */}
                <div className="temp-section user-title-bg small-space">
                  <h2 className="temp-heading h2-color">Extra Curricular</h2>

                  {extraCurriculars.map((item, index) => (
                    <div
                      key={index}
                      className="temp-item about-user  small-space"
                    >
                      <div className="temp-item-head ">
                        <h5 className="title-date">
                          <b>{item.title}</b>
                          <span>
                            {formatDate(item.startDate)},{" "}
                            {formatDate(item.endDate)}
                            <hr className="divider"></hr>
                          </span>
                        </h5>
                        <h5 className=" emp-city">
                          <b>{item.employer}</b>
                          <h6>
                            <b>{item.city}</b>
                          </h6>
                        </h5>
                      </div>
                      <p>{item.description}</p>
                      <hr className="divider small-space"></hr>
                    </div>
                  ))}
                </div>

                {/* Custom Section */}
                <div className="temp-section user-title-bg small-space">
                  <h2 className="temp-heading h2-color">Custom Sections</h2>

                  {customSections.map((item, index) => (
                    <div
                      key={index}
                      className="temp-item about-user  small-space "
                    >
                      <div className="temp-item-head ">
                        <h5 className="title-date">
                          <b>{item.title}</b>
                          <span>
                            {formatDate(item.startDate)},{" "}
                            {formatDate(item.endDate)}
                            <hr className="divider"></hr>
                          </span>
                        </h5>
                        <h5 className=" emp-city">
                          <h6>
                            <b>{item.city}</b>
                          </h6>
                        </h5>
                      </div>
                      <p>{item.description}</p>
                      <hr className="divider small-space"></hr>
                    </div>
                  ))}
                </div>
                {/* Internship */}
                <div className="temp-section user-title-bg small-space">
                  <h2 className="temp-heading h2-color">Internship History</h2>
                  {internships.map((item, index) => (
                    <div
                      key={index}
                      className="temp-item about-user small-space"
                    >
                      <div className="temp-item-head">
                        <h5 className="title-date">
                          <b>{item.title}</b>
                          <span>
                            {formatDate(item.startDate)},{" "}
                            {formatDate(item.endDate)}
                            <hr className="divider"></hr>
                          </span>
                        </h5>

                        <h6>
                          {item.employer}, {item.city}
                        </h6>
                      </div>
                      <p>{item.description}</p>
                      <hr className="divider small-space"></hr>
                    </div>
                  ))}
                </div>
                {/* Reference   */}
                {references.length > 0 && (
                  <div className="temp-section user-title-bg small-space">
                    <h2 className="temp-heading h2-color">Refernce</h2>

                    {references.map((item, index) => (
                      <div key={index} className="temp-item about-user  ">
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
                          <h5>{item.phone}</h5>
                          <h5>{item.email}</h5>
                        </div>
                        <hr className="divider small-space"></hr>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links */}
                {links.length > 0 && (
                  <div className="temp-section user-title-bg small-space">
                    <h2 className="temp-heading h2-color">Links</h2>
                    {/* <hr className="divider"></hr> */}

                    {links.map((item, index) => (
                      <div key={index} className="temp-item about-user  ">
                        <div className="temp-item-head skill-s">
                          <h5>
                            <b>{item.label}</b>
                            <a href={item.link} target="_blank">
                              {item.link}
                            </a>
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Template;
