const FormText = ({ label, name, required, error, className, ...props }) => {
  return (
    <>
      <div className={`form-group ${className}`}>
        <label className="form-label" htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          className="form-control"
          id={name}
          name={name}
          required={required}
          rows="4"
          {...props}
        ></textarea>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default FormText;
