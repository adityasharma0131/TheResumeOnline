import { FaStar, FaEnvelope, FaPhoneAlt, FaHome } from "react-icons/fa";

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
      <table>
        <tbody>
          <tr>
            <td>
              <aside className="temp-sidebar">
                <h5 className="temp-title">Personal Details</h5>
                <hr className="temp-divider" />

                {email && (
                  <p className="temp-contact-info temp-cont-icon">
                    <FaEnvelope className="temp-icon" />
                    <span>{email}</span>
                  </p>
                )}

                {phone && (
                  <p className="temp-contact-info temp-cont-icon">
                    <FaPhoneAlt className="temp-icon" />
                    <span>{phone}</span>
                  </p>
                )}

                {addressDetails && (
                  <p className="temp-contact-info temp-cont-icon">
                    <FaHome className="temp-icon" />
                    <span>{addressDetails}</span>
                  </p>
                )}

                <div className="temp-spacer"></div>

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
                {photo && <img src={photo} alt="Profile" />}

                <div className="temp-spacer"></div>

                {languages.length > 0 && (
                  <>
                    <div className="side-item">
                      <h6 className="temp-title">Languages</h6>
                      <hr className="temp-divider" />
                      {languages.map((item, index) => (
                        <div className="side-item-point" key={index}>
                          <span>{item.label}</span>
                          <div className="side-item-rating">
                            {Array.from({ length: item.level }).map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="temp-spacer"></div>
                  </>
                )}

                {skills.length > 0 && (
                  <>
                    <div className="side-item">
                      <h6 className="temp-title">Skills</h6>
                      <hr className="temp-divider" />
                      {skills.map((item, index) => (
                        <div className="side-item-point" key={index}>
                          <span>{item.skill}</span>
                          <div className="side-item-rating">
                            {Array.from({ length: item.level }).map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="temp-spacer"></div>
                  </>
                )}

                {hobbies.length > 0 && (
                  <>
                    <div className="side-item">
                      <h6 className="temp-title">Hobbies</h6>
                      <hr className="temp-divider" />
                      {hobbies.map((item, index) => (
                        <div className="side-item-point" key={index}>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="temp-spacer"></div>
                  </>
                )}

                {links.length > 0 && (
                  <>
                    <hr className="temp-divider" />
                    <div className="side-item">
                      <h6 className="temp-title">Social Links</h6>
                      {links.map((item, index) => (
                        <div className="side-item-point" key={index}>
                          <a href={item.link} target="_blank">
                            {item.link}
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="temp-spacer"></div>
                  </>
                )}

                {references.length > 0 && (
                  <>
                    <div className="side-item">
                      <h6 className="temp-title">Reference</h6>
                      <hr className="temp-divider" />
                      {references.map((item, index) => (
                        <div className="side-item-point-down" key={index}>
                          <span>
                            <b>Name - </b>
                            {item.referenceFullname}
                          </span>
                          <a href={`mailto:${item.email}`}>
                            <b>Email - </b>
                            {item.email}
                          </a>
                          <a href={`tel:${item.phone}`}>
                            <b>Phone - </b>
                            {item.phone}
                          </a>
                          <span>
                            <b>Company -</b>
                            {item.company}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </aside>
            </td>
            <td>
              {fullName && <h1 className="temp-heading">{fullName}</h1>}
              {jobTitle && <h2 className="temp-sub-heading">{jobTitle}</h2>}

              {fullName || jobTitle ? (
                <div className="temp-spacer"></div>
              ) : (
                <></>
              )}

              {summary && (
                <>
                  <h5 className="temp-title">Summary</h5>
                  <hr className="temp-divider" />
                  <p>{summary}</p>

                  <div className="temp-spacer"></div>
                </>
              )}

              {professions.length > 0 && (
                <>
                  <div className="temp-section">
                    <h5 className="temp-title">Work Experience</h5>
                    <hr className="temp-divider" />
                    {professions.map((item, index) => (
                      <div key={index} className="temp-item">
                        <div className="temp-item-head">
                          <h5>
                            <b>{item.title}</b>
                            <span>
                              {formatDate(item.startDate)},{" "}
                              {formatDate(item.endDate)}
                            </span>
                          </h5>
                          <h6>
                            {item.employer}, {item.city}
                          </h6>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="temp-spacer"></div>
                </>
              )}

              {educations.length > 0 && (
                <>
                  <div className="temp-section">
                    <h6 className="temp-title">Education History</h6>
                    <hr className="temp-divider" />
                    {educations.map((item, index) => (
                      <div key={index} className="temp-item">
                        <div className="temp-item-head">
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
                  <div className="temp-spacer"></div>
                </>
              )}

              {courses.length > 0 && (
                <>
                  <div className="temp-section">
                    <h6 className="temp-title">Courses History</h6>
                    <hr className="temp-divider" />
                    {courses.map((item, index) => (
                      <div key={index} className="temp-item">
                        <div className="temp-item-head">
                          <h5>
                            <b>{item.title}</b>
                            <span>
                              {formatDate(item.startDate)},{" "}
                              {formatDate(item.endDate)}
                            </span>
                          </h5>
                          <h6>
                            {item.institute}, {item.city}
                          </h6>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="temp-spacer"></div>
                </>
              )}

              {internships.length > 0 && (
                <>
                  <div className="temp-section">
                    <h6 className="temp-title">Internship History</h6>
                    <hr className="temp-divider" />
                    {internships.map((item, index) => (
                      <div key={index} className="temp-item">
                        <div className="temp-item-head">
                          <h5>
                            <b>{item.title}</b>
                            <span>
                              {formatDate(item.startDate)},{" "}
                              {formatDate(item.endDate)}
                            </span>
                          </h5>
                          <h6>
                            {item.employer}, {item.city}
                          </h6>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="temp-spacer"></div>
                </>
              )}

              {extraCurriculars.length > 0 && (
                <>
                  <div className="temp-section">
                    <h6 className="temp-title">Extra Curricular</h6>
                    <hr className="temp-divider" />
                    {extraCurriculars.map((item, index) => (
                      <div key={index} className="temp-item">
                        <div className="temp-item-head">
                          <h5>
                            <b>{item.title}</b>
                            <span>
                              {formatDate(item.startDate)},{" "}
                              {formatDate(item.endDate)}
                            </span>
                          </h5>
                          <h6>
                            {item.employer}, {item.city}
                          </h6>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="temp-spacer"></div>
                </>
              )}

              {customSections.length > 0 && (
                <>
                  <div className="temp-section">
                    <h6 className="temp-title">Custom Section</h6>
                    <hr className="temp-divider" />
                    {customSections.map((item, index) => (
                      <div key={index} className="temp-item">
                        <div className="temp-item-head">
                          <h5>
                            <b>{item.title}</b>
                            <span>
                              {formatDate(item.startDate)},{" "}
                              {formatDate(item.endDate)}
                            </span>
                          </h5>
                          <h6>{item.city}</h6>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  {/* <div className="temp-spacer"></div> */}
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Template;
