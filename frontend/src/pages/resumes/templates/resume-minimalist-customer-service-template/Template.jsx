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
        <div className="image">
          <img src={photo ? photo : DummyUser} alt="Profile Photo" />
        </div>
        <div className="text">
          {fullName && <h1 className="temp-heading">{fullName}</h1>}
          {jobTitle && <h2 className="temp-sub-heading">{jobTitle}</h2>}

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
      </div>

      <hr className="temp-divider" />

      {summary && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Professional Summary</h5>
            </div>
            <div className="temp-col">
              <p>{summary}</p>
            </div>
          </div>
        </>
      )}

      <hr className="temp-divider" />

      <div className="temp-section">
        <div className="temp-col">
          <h5 className="temp-title">Personal Details</h5>
        </div>
        <div className="temp-col">
          <div className="temp-grid">
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
          </div>
        </div>
      </div>

      <hr className="temp-divider" />

      {professions.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Work Experience</h5>
            </div>
            <div className="temp-col">
              {professions.map((item, index) => (
                <div key={index} className="temp-item">
                  <div className="temp-item-head">
                    <h5>
                      <b>{item.title}</b>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
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
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {educations.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Education History</h5>
            </div>
            <div className="temp-col">
              {educations.map((item, index) => (
                <div key={index} className="temp-item">
                  <div className="temp-item-head">
                    <h5>
                      <b>{item.degree}</b>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
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
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {courses.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Courses History</h5>
            </div>
            <div className="temp-col">
              {courses.map((item, index) => (
                <div key={index} className="temp-item">
                  <div className="temp-item-head">
                    <h5>
                      <b>{item.title}</b>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
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
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {internships.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Internship History</h5>
            </div>
            <div className="temp-col">
              {internships.map((item, index) => (
                <div key={index} className="temp-item">
                  <div className="temp-item-head">
                    <h5>
                      <b>{item.title}</b>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
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
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {extraCurriculars.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Extra Curricular</h5>
            </div>
            <div className="temp-col">
              {extraCurriculars.map((item, index) => (
                <div key={index} className="temp-item">
                  <div className="temp-item-head">
                    <h5>
                      <b>{item.title}</b>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
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
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {customSections.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Custom Section</h5>
            </div>
            <div className="temp-col">
              {customSections.map((item, index) => (
                <div key={index} className="temp-item">
                  <div className="temp-item-head">
                    <h5>
                      <b>{item.title}</b>
                      <span>
                        {formatDate(item.startDate)}, {formatDate(item.endDate)}
                      </span>
                    </h5>
                    <h6>{item.city}</h6>
                  </div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {languages.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Languages</h5>
            </div>
            <div className="temp-col">
              <div className="temp-grid">
                {languages.map((item, index) => (
                  <div className="item-point" key={index}>
                    <span>{item.label}</span>
                    <div className="item-rating">
                      {Array.from({ length: item.level }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {skills.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Skills</h5>
            </div>
            <div className="temp-col">
              <div className="temp-grid">
                {skills.map((item, index) => (
                  <div className="item-point" key={index}>
                    <span>{item.skill}</span>
                    <div className="item-rating">
                      {Array.from({ length: item.level }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {hobbies.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Hobbies</h5>
            </div>
            <div className="temp-col">
              <div className="temp-grid">
                {hobbies.map((item, index) => (
                  <div className="item-point" key={index}>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {links.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Social Links</h5>
            </div>
            <div className="temp-col">
              <div className="temp-grid">
                {links.map((item, index) => (
                  <a href={item.link} target="_blank" key={index}>
                    {item.link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <hr className="temp-divider" />

      {references.length > 0 && (
        <>
          <div className="temp-section">
            <div className="temp-col">
              <h5 className="temp-title">Reference</h5>
            </div>
            <div className="temp-col">
              <div className="temp-grid-2">
                {references.map((item, index) => (
                  <div className="item-point-down" key={index}>
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Template;
