import { v4 as uuidv4 } from "uuid";

const FormRadioSlide = ({
  label,
  name,
  options = [],
  error,
  value = "",
  onChange,
  className,
  ...props
}) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="form-radio-slide">
        {options.map((option) => {
          const inputId = `${name}-${option.value}-${uuidv4()}`;
          return (
            <div key={option.value} className="form-radio-slide-item">
              <input
                type="radio"
                id={inputId}
                name={name}
                value={option.value}
                checked={value === String(option.value)}
                onChange={handleChange}
                {...props}
              />
              <label
                htmlFor={inputId}
                className={value === String(option.value) ? "active" : ""}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormRadioSlide;
