import { Button, Col, Input, Row, Select, Space } from "antd";
import { Field, ErrorMessage, useFormikContext } from "formik";

const { Option } = Select;

export default function Step1({ onNext }) {
  const {
    touched,
    errors,
    values,
    validateForm,
    setTouched,
  } = useFormikContext(); 

  const handleNext = async () => {
    const formErrors = await validateForm();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    });

    if (Object.keys(formErrors).length === 0) {
      onNext();
    }
  };


  return (
    <>
      <div className="text-[#C1C4C9] text-sm mb-2">Step 1/3</div>
      <h4 className="text-lg xl:text-2xl font-bold text-gray-800">Basic Info</h4>
      <p className="text-gray-500 mt-2 text-sm md:text-base">Tell us about yourself.</p>
      <div className="border-b-1 border-[#ededed] pt-5 mb-5"></div>

      <Row gutter={[16, 16]}>
        {/* First Name */}
        <Col span={12}>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <Field name="firstName">
            {({ field }) => (
              <Input
                {...field}
                status={
                  touched.firstName && errors.firstName ? "error" : ""
                }
                placeholder="Enter first name"
              />
            )}
          </Field>
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </Col>

        {/* Last Name */}
        <Col span={12}>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <Field name="lastName">
            {({ field }) => (
              <Input
                {...field}
                status={
                  touched.lastName && errors.lastName ? "error" : ""
                }
                placeholder="Enter last name"
              />
            )}
          </Field>
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </Col>

        {/* Email */}
        <Col span={24}>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Field name="email">
            {({ field }) => (
              <Input
                {...field}
                type="email"
                status={touched.email && errors.email ? "error" : ""}
                placeholder="Enter email"
              />
            )}
          </Field>
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </Col>

        {/* Phone Number */}
        <Col span={24}>
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Field name="phone">
              {({ field }) => (
                <Input
                  {...field}
                  addonBefore={
                    <Select defaultValue="+91" style={{ width: 90 }}>
                      <Option value="+91">+91</Option>
                      <Option value="+1">+1</Option>
                      <Option value="+44">+44</Option>
                    </Select>
                  }
                  status={touched.phone && errors.phone ? "error" : ""}
                  placeholder="Enter phone number"
                />
              )}
            </Field>
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </Space>
        </Col>
      </Row>

      <Button
        type="primary"
        className="!mt-6 !py-5 !px-10"
        onClick={handleNext}
      >
        Next
      </Button>
    </>
  );
}
