import { Button, Col, Input, Row, Select } from "antd";
import { Field, ErrorMessage, useFormikContext } from "formik";

const { Option } = Select;

export default function Step2({ onNext, onBack }) {
  const {
    values,
    errors,
    touched,
    setTouched,
    setFieldValue,
    validateForm,
  } = useFormikContext();

  const options = ["Small", "Medium", "Large"];

  const handleNext = async () => {
    setTouched({
      ...touched,
      companyName: true,
      selectedSize: true,
      industry: true,
    });

    const formErrors = await validateForm();

    if (Object.keys(formErrors).length === 0) {
      onNext();
    }
  };

  return (
    <>
      <div className="text-[#C1C4C9] text-sm mb-2">Step 2/3</div>
      <h4 className="text-lg xl:text-2xl font-bold text-gray-800">Company Details</h4>
      <p className="text-gray-500 mt-2 text-sm md:text-base">About your organization.</p>
      <div className="border-b-1 border-[#ededed] pt-5 mb-5"></div>

      <Row gutter={[16, 16]}>
        {/* Company Name */}
        <Col span={24}>
          <label className="block text-sm font-medium mb-2">Company name</label>
          <Field name="companyName">
            {({ field }) => (
              <Input
                {...field}
                placeholder="Enter company name"
                status={
                  touched.companyName && errors.companyName ? "error" : ""
                }
              />
            )}
          </Field>
          <ErrorMessage
            name="companyName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </Col>

        {/* Team Size */}
        <Col span={24}>
          <label className="block text-sm font-medium mb-2">Team size</label>
          <div className="relative w-full">
            <div className="absolute top-[7px] left-0 right-0 h-1 bg-[#D6E0EA] z-20" />
            <div
              className="absolute top-[7px] left-0 h-1 bg-blue-500 z-30 transition-all duration-300"
              style={{
                width: `${values.selectedSize !== null ? ((values.selectedSize || 0) / (options.length - 1)) * 100 : 0}%`,
              }}
            />
            <div className="grid grid-cols-3 relative z-40">
              {options.map((label, index) => {
                const align =
                  index === 0
                    ? "items-start"
                    : index === options.length - 1
                    ? "items-end"
                    : "items-center";

                return (
                  <div
                    key={index}
                    className={`flex flex-col ${align} cursor-pointer`}
                    onClick={() => {
                      setFieldValue("selectedSize", index);
                      setTouched({
                        ...touched,
                        selectedSize: true,
                      });
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                        ${
                          values.selectedSize !== null && index <= values.selectedSize
                            ? "border-blue-600"
                            : "bg-[#D6E0EA] border-[#D6E0EA]"
                        }
                        ${
                          touched.selectedSize && errors.selectedSize
                            ? "border-red-500"
                            : ""
                        }`}
                    >
                      {values.selectedSize !== null && index === values.selectedSize && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm transition-all
                        ${
                          values.selectedSize !== null && index === values.selectedSize
                            ? "text-blue-600"
                            : touched.selectedSize && errors.selectedSize
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Team Size Error Message */}
          {touched.selectedSize && errors.selectedSize && (
            <div className="text-red-500 text-sm mt-2">
              {errors.selectedSize}
            </div>
          )}
        </Col>

        {/* Industry */}
        <Col span={24}>
          <label className="block text-sm font-medium mb-2">Industry</label>
          <Field name="industry">
            {({ field }) => (
              <Select
                {...field}
                onChange={(value) => setFieldValue("industry", value)}
                className="w-full"
                status={touched.industry && errors.industry ? "error" : ""}
                options={[
                  { value: "IT", label: "IT" },
                  { value: "healthcare", label: "Healthcare" },
                  { value: "finance", label: "Finance" },
                ]}
                placeholder="Select industry"
              />
            )}
          </Field>
          <ErrorMessage
            name="industry"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </Col>
      </Row>

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
          onClick={handleNext}
          className="!py-5 !px-10 !ms-[10px]"
        >
          Next
        </Button>
      </div>
    </>
  );
}