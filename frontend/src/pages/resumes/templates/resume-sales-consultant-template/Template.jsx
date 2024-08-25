import { FaStar, FaEnvelope, FaPhoneAlt, FaHome } from "react-icons/fa";

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
      <div className="temp-head">
        <div className="main">
          <div className="image">
            <img src={photo ? photo : DummyUser} alt="Profile Photo" />
          </div>
          <div className="text">
            {fullName && <h1 className="temp-heading">{fullName}</h1>}
            {jobTitle && <h2 className="temp-sub-heading">{jobTitle}</h2>}
          </div>
        </div>
        <div className="info">
          {email && (
            <p>
              <FaEnvelope className="temp-icon" />
              <span>{email}</span>
            </p>
          )}

          {phone && (
            <p>
              <FaPhoneAlt className="temp-icon" />
              <span>{phone}</span>
            </p>
          )}

          {addressDetails && (
            <p>
              <FaHome className="temp-icon" />
              <span>{addressDetails}</span>
            </p>
          )}
        </div>
      </div>

      <table>
        <tbody>
          <tr>
            <td>
              <aside className="temp-sidebar">
                {educations.length > 0 && (
                  <>
                    <div className="temp-section">
                      <h6 className="temp-title">Education History</h6>
                      {educations.map((item, index) => (
                        <div key={index} className="temp-item">
                          <div className="temp-item-head">
                            <h5>
                              <b>{item.degree}</b>
                            </h5>
                            <h6>
                              {item.school}, {item.city}
                            </h6>
                            <h6>
                              {formatDate(item.startDate)},{" "}
                              {formatDate(item.endDate)}
                            </h6>
                          </div>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="temp-spacer"></div>
                  </>
                )}

                <h5 className="temp-title">Personal Details</h5>
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
              {summary && (
                <>
                  <h5 className="temp-title">Summary</h5>
                  <p>{summary}</p>

                  <div className="temp-spacer"></div>
                </>
              )}

              {professions.length > 0 && (
                <>
                  <div className="temp-section">
                    <h5 className="temp-title">Work Experience</h5>
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

              {courses.length > 0 && (
                <>
                  <div className="temp-section">
                    <h6 className="temp-title">Courses History</h6>
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
