import { useEffect, useState } from 'react';

function SelectCategory({
  categories,
  onChange,
  setShowOption = false,
  name,
  id,
  defaultValue = '',
}) {
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(event);
    setShowOption && setShowOption(value);
  };

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <select
      onChange={handleSelectChange}
      name={name}
      className="form-select"
      id={id}
      aria-describedby="categoryHelper"
      value={selectedValue}
      required
    >
      <option value="" hidden>
        Select Category
      </option>

      {categories &&
        categories.data.map((category) => {
          return (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          );
        })}
    </select>
  );
}

export default SelectCategory;
