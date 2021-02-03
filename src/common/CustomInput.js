import React from 'react';
import '../App.css';

const CustomInput = (props) => {
    const { value, label, name, type, placeholder, onChange, errors, touched, handleBlur } = props;
    return (
        <>
            <label>{label}</label>
            <input
                className={!!errors && !!touched  ?  'form-control input-error' : `form-control`}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={handleBlur}
            />
            {!!errors && !!touched && (
                <p style={{ color: "#f00" }}>{"*" + errors}</p>
            )}




            {
                /* 
                <CustomInput
                    label="Email Address"
                    value={values?.email}
                    name="email"
                    type='email'
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                />
                
                */
            }
        </>
    );
};

export default CustomInput;