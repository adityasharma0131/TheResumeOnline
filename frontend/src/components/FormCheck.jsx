const FormCheck = ({
  label,
  name,
  options = [],
  required = false,
  error,
  multiple = false,
  value = [],
  onChange,
  className,
  ...props
}) => {
  const handleChange = (event) => {
    if (multiple) {
      const { value: optionValue, checked } = event.target;
      if (checked) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((v) => v !== optionValue));
      }
    } else {
      onChange(event.target.checked);
    }
  };

  return (
    <div className={`form-group ${className}`}>
      <div className="form-check">
        {multiple ? (
          options.map((option) => (
            <div key={option.value} className="form-check-item">
              <input
                type="checkbox"
                id={`${name}_${option.value}`}
                name={name}
                value={option.value}
                checked={value.includes(option.value)}
                onChange={handleChange}
                {...props}
              />
              <label className="form-label" htmlFor={`${name}_${option.value}`}>
                {option.label}{" "}
                {required && <span className="text-red-500">*</span>}
              </label>
            </div>
          ))
        ) : (
          <div className="form-check-item">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value}
              onChange={handleChange}
              {...props}
            />
            <label htmlFor={name} className="form-check-label">
              {label}
            </label>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormCheck;
