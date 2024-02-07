import React from "react";

const SpecializationSidebar = ({
  availableSpecializations,
  selectedSpecializations,
  setSelectedSpecializations,
}) => {
  const handleSpecializationChange = (e, specialization) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedSpecializations((prevSelected) => [
        ...prevSelected,
        specialization,
      ]);
    } else {
      setSelectedSpecializations((prevSelected) =>
        prevSelected.filter((item) => item !== specialization)
      );
    }
  };

  return (
    <div className="p-4 rounded-md">
      <h3 className="text-lg font-bold mb-4 text-green-500">
        Filter by Specialization
      </h3>
      <div>
        {availableSpecializations.map((specialization) => (
          <div key={specialization._id} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value={specialization.name}
                checked={selectedSpecializations.includes(specialization.name)}
                onChange={(e) =>
                  handleSpecializationChange(e, specialization.name)
                }
                className="mr-2"
              />
              <span className="font-semibold text-gray-800">
                {specialization.name}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecializationSidebar;
