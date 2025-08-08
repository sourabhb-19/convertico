import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Step1, Step2, Step3 } from "../Components";
import logo from "../assets/images/logo.png";
import { Button } from "antd";

export default function SignUp() {
  const [step, setStep] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    "Sales Manager",
    "Super admin",
    "Admin",
    "Marketing Manager",
    "Customer Support",
    "Data Analyst",
    "Others",
  ];

  const stepDescriptions = [
    "Personal details of user",
    "Company's basic information",
    "User role in the platform",
  ];

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedSize: null, 
    companyName: "",
    industry: "",
    role: "",
  };

  const validationSchemas = [
    Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    Yup.object({
      companyName: Yup.string().required("Company name is required"),
      selectedSize: Yup.number()
        .nullable()
        .test('required', 'Please select team size', function(value) {
          return value !== null && value !== undefined;
        })
        .min(0, "Invalid team size")
        .max(2, "Invalid team size"),
      industry: Yup.string().required("Industry is required"),
    }),
    Yup.object({
      role: Yup.string().required("Role is required"),
    }),
  ];

  // Success message component
  const SuccessMessage = () => {
    const teamSizeLabels = ["Small", "Medium", "Large"];
    
    return (
      <div className="text-center py-10">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Registration Successful!</h2>
          <p className="text-gray-600">Your account has been created successfully.</p>
        </div>

        {/* Form Data Summary */}
        <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto text-left">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Registration Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Personal Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Name:</span> {submittedData?.firstName} {submittedData?.lastName}</p>
                <p><span className="font-medium">Email:</span> {submittedData?.email}</p>
                <p><span className="font-medium">Phone:</span> {submittedData?.phone}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Company Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Company:</span> {submittedData?.companyName}</p>
                <p><span className="font-medium">Team Size:</span> {teamSizeLabels[submittedData?.selectedSize]}</p>
                <p><span className="font-medium">Industry:</span> {submittedData?.industry}</p>
                <p><span className="font-medium">Role:</span> {submittedData?.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setSubmittedData(null);
              setStep(0);
            }}
            type="primary"
          >
            Register Another User
          </Button>
          
          
        </div>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <SuccessMessage />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-2 lg:py-10 px-2 sm:px-5 lg:px-0">
      <div className="w-full lg:w-[900px] xl:w-6xl md:flex rounded-4xl overflow-hidden min-h-[500px] ">
        <div className="md:w-100 lg:w-150 h-100vh bg-[#0056a3] p-2 lg:p-10 relative">
          <img src={logo} alt="Logo" className=" pt-5 lg:pt-0" />
          <div className="text-white space-y-2 my-10 md:my-20">
            {["Your personal details", "Your company details", "Your role"].map(
              (text, index) => {
                const getStepIcon = (stepIndex, isActive) => {
                  const iconClass = `w-5 h-5 ${isActive ? 'text-blue-700' : 'text-white'}`;
                  
                  switch(stepIndex) {
                    case 0:
                      return (
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg>
                      );
                    case 1: 
                      return (
                        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                        </svg>
                      );
                    case 2: 
                      return (
                        <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" fill="currentColor"><path d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM14.5946 18.8115C14.5327 18.5511 14.5 18.2794 14.5 18C14.5 17.7207 14.5327 17.449 14.5945 17.1886L13.6029 16.6161L14.6029 14.884L15.5952 15.4569C15.9883 15.0851 16.4676 14.8034 17 14.6449V13.5H19V14.6449C19.5324 14.8034 20.0116 15.0851 20.4047 15.4569L21.3971 14.8839L22.3972 16.616L21.4055 17.1885C21.4673 17.449 21.5 17.7207 21.5 18C21.5 18.2793 21.4673 18.551 21.4055 18.8114L22.3972 19.3839L21.3972 21.116L20.4048 20.543C20.0117 20.9149 19.5325 21.1966 19.0001 21.355V22.5H17.0001V21.3551C16.4677 21.1967 15.9884 20.915 15.5953 20.5431L14.603 21.1161L13.6029 19.384L14.5946 18.8115ZM18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z"></path></svg>
                      );
                    default:
                      return <span>{stepIndex + 1}</span>;
                  }
                };

                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 relative pb-4`}
                  >
                    {index !== 2 && (
                      <div className="absolute left-5 top-12 bottom-0 w-px bg-white/50"></div>
                    )}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          step >= index
                            ? "bg-white text-blue-700"
                            : "border-2 border-white text-white"
                        } flex items-center justify-center`}
                      >
                        {getStepIcon(index, step >= index)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md lg:text-lg">{text}</h4>
                      <p className="text-sm text-white/80">{stepDescriptions[index]}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <footer className="mt-10 text-white/80 text-sm absolute bottom-5 left-10">
            All rights reserved. ©Convertico
          </footer>
        </div>
        <div className="w-full h-100vh bg-white py-2 sm:py-10 xl:py-30 px-2 sm:px-10 xl:px-40">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[step]}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={async (values) => {
              if (step === 2) {
                console.log("Final Submit", values); 
                setSubmittedData(values);
                setIsSubmitted(true);
              } else {
                setStep(step + 1);
              }
            }}
          >
            {({ values, errors, touched, setFieldValue, validateForm, handleSubmit }) => (
              <Form>
                {step === 0 && (
                  <Step1
                    onNext={async () => {
                      const errors = await validateForm();
                      if (Object.keys(errors).length === 0) setStep(1);
                    }}
                  />
                )}

                {step === 1 && (
                  <Step2
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    onBack={() => setStep(0)}
                    onNext={async () => {
                      const errors = await validateForm();
                      if (Object.keys(errors).length === 0) setStep(2);
                    }}
                  />
                )}

                {step === 2 && (
                  <Step3
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    validateForm={validateForm}
                    onBack={() => setStep(1)}
                    roles={roles}
                  />
                )}
              </Form>
            )}
          </Formik> 
        </div>
      </div>
    </section>
  );
}