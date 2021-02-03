import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import  '../../App.css'
import CustomInput from '../../common/CustomInput';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSignup } from '../../redux/actions/signup.action';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required("Please provide a valid password"),
});

const Signup = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    let { from } = location.state || { from: { pathname: "/" } };

    if (auth.authenticate) {
        history.replace(from)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(authSignup(values))
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                    <Layout>
                        {/* {console.log('errors', errors)} */}
                        <div className='container' style={{ marginTop: '4rem' }}>
                            <div className='row d-flex justify-content-center'>
                                <div className='col-md-6'>
                                    <Form >
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <CustomInput
                                                    label="First Name"
                                                    value={values?.firstName}
                                                    name="firstName"
                                                    type='text'
                                                    placeholder="First name"
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errors={errors.firstName}
                                                    touched={touched.firstName}
                                                />
                                            </div>
                                            <div className='col-lg-6'>
                                                <CustomInput
                                                    label="Last Name"
                                                    value={values?.lastName}
                                                    name="lastName"
                                                    type='text'
                                                    placeholder="Last name"
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errors={errors.lastName}
                                                    touched={touched.lastName}
                                                />
                                            </div>
                                            <div className='col-12'>
                                                <CustomInput
                                                    label="Email Address"
                                                    value={values?.email}
                                                    name="email"
                                                    type='email'
                                                    placeholder="Enter Your Email"
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errors={errors.email}
                                                    touched={touched.email}
                                                />
                                            </div>
                                            <div className='col-12'>
                                                <CustomInput
                                                    label="Password"
                                                    value={values?.password}
                                                    name="password"
                                                    type='password'
                                                    placeholder="Enter Your Password"
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errors={errors.password}
                                                    touched={touched.password}
                                                />
                                            </div>
                                            <div className='col-12 mt-2'>
                                                <button
                                                    type="submit"
                                                    className='btn btn-primary custom-btn-css'
                                                >
                                                    Signup
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Layout>
                )}
        </Formik>
    );
};

export default Signup;