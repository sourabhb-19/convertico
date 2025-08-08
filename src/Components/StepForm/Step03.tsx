import { Button } from "antd";
import { useFormikContext } from "formik";

export default function Step3({ roles, onBack }) {
  const { values, setFieldValue, handleSubmit, errors, touched, validateForm, setTouched } = useFormikContext();

  const handleConfirm = async (e) => {
    e.preventDefault();
    
    // Role को touched mark करें
    setTouched({
      ...touched,
      role: true,
    });

    // Validation check करें
    const formErrors = await validateForm();
    
    // अगर कोई error नहीं है तो form submit करें
    if (Object.keys(formErrors).length === 0) {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className="text-[#C1C4C9] text-sm mb-2">Step 3/3</div>
      <h4 className="text-lg xl:text-2xl font-bold text-gray-800">User Role</h4>
      <p className="text-gray-500 mt-2 text-sm md:text-base">Your role in the organization.</p>
      <div className="border-b-1 border-[#ededed] pt-5 mb-5"></div>

      <div className="flex flex-wrap gap-4">
        {roles.map((role) => (
          <label
            key={role}
            className={`cursor-pointer flex items-center gap-2 px-4 py-3 rounded-lg border transition-all
              ${
                values.role === role
                  ? "border-blue-500 bg-blue-50 shadow-sm border-2"
                  : "border-gray-300 bg-white"
              }`}
          >
            <input
              type="radio"
              name="role"
              value={role}
              checked={values.role === role}
              onChange={() => setFieldValue("role", role)}
              className="hidden"
            />
            <span className="text-sm font-medium">{role}</span>
          </label>
        ))}
      </div>

      {/* Error message */}
      {touched.role && errors.role && (
        <div className="text-red-500 text-sm mt-2">{errors.role}</div>
      )}

      <div className="flex align-center mt-6">
        <Button
          onClick={onBack}
          className="text-[] w-[50px] min-h-[42px] flex items-center justify-center"
          color="primary"
          variant="filled"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill="currentColor"
          >
            <path d="M22.0003 13.0001L22.0004 11.0002L5.82845 11.0002L9.77817 7.05044L8.36396 5.63623L2 12.0002L8.36396 18.3642L9.77817 16.9499L5.8284 13.0002L22.0003 13.0001Z"></path>
          </svg>
        </Button>

        <Button
          type="primary"
          onClick={handleConfirm}
          className="!py-5 !px-10 !ms-[10px]"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}