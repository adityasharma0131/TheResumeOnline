import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

import formatDate from "../../../../utils/dateFormator";
// import "./style.css";

const PAGE_HEIGHT = 1123;

const ResumeDefaultTemplate = ({ resume }) => {
  const [pages, setPages] = useState([]);
  const tempRef = useRef();

  useEffect(() => {
    const sections = tempRef.current.children;
    let currentPage = [];
    let tempHeight = 0;

    const newPages = [];

    Array.from(sections).forEach((section, index) => {
      const sectionHeight = section.getBoundingClientRect().height;
      console.log("Section", section.getBoundingClientRect());
      console.log("Sec Height", section);
      if (tempHeight + sectionHeight > PAGE_HEIGHT) {
        newPages.push(currentPage);
        currentPage = [section];
        tempHeight = sectionHeight;
      } else {
        currentPage.push(section);
        tempHeight += sectionHeight;
      }

      if (index === sections.length - 1) {
        newPages.push(currentPage);
      }
    });

    setPages(newPages);
    console.log("Pages", newPages);
  }, [resume]);

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
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="page">
          <h1>{fullName}</h1>
          <h2>{jobTitle}</h2>
          <hr className="divider" />
          <table className="info-container">
            <tbody>
              <tr>
                <td colSpan={3} valign="top">
                  {/* Contact Info */}
                  <div className="contact-info">
                    {email && (
                      <p>
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                    )}
                    {phone && <p>{phone}</p>}
                    {addressDetails && <p>{addressDetails}</p>}

                    <hr className="divider" />

                    {drivingLicense && (
                      <p>
                        <span>Driving License</span>
                        {drivingLicense}
                      </p>
                    )}
                    {nationality && (
                      <p>
                        <span>Nationality</span>
                        {nationality}
                      </p>
                    )}
                    {placeOfBirth && (
                      <p>
                        <span>Place Of Birth</span>
                        {placeOfBirth}
                      </p>
                    )}
                    {dateOfBirth && (
                      <p>
                        <span>Date Of Birth</span>
                        {formatDate(dateOfBirth)}
                      </p>
                    )}
                    {gender && (
                      <p>
                        <span>Gender</span>
                        {gender}
                      </p>
                    )}
                    {maritalStatus && (
                      <p>
                        <span>Marital Status</span>
                        {maritalStatus}
                      </p>
                    )}
                    {photo && <img src={photo} alt="Profile" />}

                    {languages.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Languages</h6>
                          {languages.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <span>{item.label}</span>
                              <div className="side-item-rating">
                                {Array.from({ length: item.level }).map(
                                  (_, i) => (
                                    <FaStar key={i} />
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {skills.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Skills</h6>
                          {skills.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <span>{item.skill}</span>
                              <div className="side-item-rating">
                                {Array.from({ length: item.level }).map(
                                  (_, i) => (
                                    <FaStar key={i} />
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {hobbies.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Hobbies</h6>
                          {hobbies.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {links.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Social Links</h6>
                          {links.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <a href={item.link} target="_blank">
                                {item.link}
                              </a>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {references.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Reference</h6>
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
                  </div>
                </td>

                <td colSpan={9} valign="top">
                  {/* Detail Info */}
                  <div className="detail-info">
                    {summary && <p>{summary}</p>}

                    {professions.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Employment History</h6>
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
                    )}

                    {educations.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Education History</h6>
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
                    )}

                    {courses.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Courses History</h6>
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
                    )}

                    {internships.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Internship History</h6>
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
                    )}

                    {extraCurriculars.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Extra Curricular</h6>
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
                    )}

                    {customSections.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Custom Section</h6>
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
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
      <div ref={tempRef} className="hidden-temp">
        <div>
          <h1>{fullName}</h1>
          <h2>{jobTitle}</h2>
          <hr className="divider" />
          <table className="info-container">
            <tbody>
              <tr>
                <td colSpan={3} valign="top">
                  {/* Contact Info */}
                  <div className="contact-info">
                    {email && (
                      <p>
                        <a href={`mailto:${email}`}>{email}</a>
                      </p>
                    )}
                    {phone && <p>{phone}</p>}
                    {addressDetails && <p>{addressDetails}</p>}

                    <hr className="divider" />

                    {drivingLicense && (
                      <p>
                        <span>Driving License</span>
                        {drivingLicense}
                      </p>
                    )}
                    {nationality && (
                      <p>
                        <span>Nationality</span>
                        {nationality}
                      </p>
                    )}
                    {placeOfBirth && (
                      <p>
                        <span>Place Of Birth</span>
                        {placeOfBirth}
                      </p>
                    )}
                    {dateOfBirth && (
                      <p>
                        <span>Date Of Birth</span>
                        {formatDate(dateOfBirth)}
                      </p>
                    )}
                    {gender && (
                      <p>
                        <span>Gender</span>
                        {gender}
                      </p>
                    )}
                    {maritalStatus && (
                      <p>
                        <span>Marital Status</span>
                        {maritalStatus}
                      </p>
                    )}
                    {photo && <img src={photo} alt="Profile" />}

                    {languages.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Languages</h6>
                          {languages.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <span>{item.label}</span>
                              <div className="side-item-rating">
                                {Array.from({ length: item.level }).map(
                                  (_, i) => (
                                    <FaStar key={i} />
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {skills.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Skills</h6>
                          {skills.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <span>{item.skill}</span>
                              <div className="side-item-rating">
                                {Array.from({ length: item.level }).map(
                                  (_, i) => (
                                    <FaStar key={i} />
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {hobbies.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Hobbies</h6>
                          {hobbies.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {links.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Social Links</h6>
                          {links.map((item, index) => (
                            <div className="side-item-point" key={index}>
                              <a href={item.link} target="_blank">
                                {item.link}
                              </a>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {references.length > 0 && (
                      <>
                        <hr className="divider" />
                        <div className="side-item">
                          <h6 className="side-title">Reference</h6>
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
                  </div>
                </td>

                <td colSpan={9} valign="top">
                  {/* Detail Info */}
                  <div className="detail-info">
                    {summary && <p>{summary}</p>}

                    {professions.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Employment History</h6>
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
                    )}

                    {educations.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Education History</h6>
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
                    )}

                    {courses.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Courses History</h6>
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
                    )}

                    {internships.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Internship History</h6>
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
                    )}

                    {extraCurriculars.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Extra Curricular</h6>
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
                    )}

                    {customSections.length > 0 && (
                      <div className="temp-section">
                        <h6 className="temp-heading">Custom Section</h6>
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
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResumeDefaultTemplate;
