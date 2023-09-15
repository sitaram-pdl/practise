function Input({
  id,
  type = 'number',
  name,
  defaultValue = '',
  aria,
  onChange,
  subLabel = '',
  style = '',
  required = true,
}) {
  const deValues =
    defaultValue && type === 'number'
      ? Math.round(defaultValue * 100)
      : defaultValue;
  return (
    <div className="mb-3" style={{ ...style }}>
      <label
        htmlFor={id}
        className="form-label"
        style={{ textTransform: 'capitalize' }}
      >
        {id}
      </label>

      <input
        onChange={onChange}
        type={type}
        className="form-control audit-form"
        name={name}
        id={id}
        required={required}
        defaultValue={deValues}
        min={0}
        aria-describedby={aria}
      />
      <div id={aria} className="form-text">
        {subLabel ? subLabel : ` Enter ${id} in percentage (%)`}
      </div>
    </div>
  );
}

export default Input;
