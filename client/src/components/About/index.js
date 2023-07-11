import React, { useEffect, useState } from "react";

const Contact = () => {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        issue: "",
        comment: "",
    })

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState();

    const finishSubmit = () => {
        console.log(contactForm);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit()
        }
    }, [errors]);

    const validateValues = (contactValue) => {
        let errors = {};
        const expression = /(.+)@(.+){2,}\.(.+){2,}/;
        if (!expression.test(contactValue.email)) {
            errors.email = "Invalid Email";
        }
        if (contactValue.name.length === 0) {
            errors.name = "Invalid Name";
        }
        if (contactValue.issue === "") {
            errors.issue = "Invalid Issue";
        }
        if (contactValue.comment.length < 10) {
            errors.comment = "Invalid Comment";
        }
        return errors;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContactForm({
            ...contactForm,
            [name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validateValues(contactForm));
        setSubmitting(true);
        setContactForm({
            name: "",
            email: "",
            issue: "",
            comment: "",
        })
    }

    return (
        <div className="login-logout flex justify-center items-center text-white text-xl">
            <div className="login-container transition ease-in-out delay-150 bg-black opacity-50 hover:opacity-70 rounded-2xl h-auto lg:w-2/5 xs:w-screen text-center">
                <div>
                    <h2 className='text-4xl m-4'>Contact</h2>
                </div>
                {Object.keys(errors).length === 0 && submitting ? (
                    <div className="flex-row space-between my-2">
                        <span
                            className="flex-row space-between my-2"
                        >Successfully submitted ✓</span>
                        <p
                            className="flex-row space-between my-2"
                        >One of our team members will be contacting you shortly.</p>
                    </div>
                ) : null}
                <form onSubmit={handleSubmit} className="m-5">
                    <div className="flex-row space-between my-2">
                        <input
                            className="login-input rounded-2xl m-3 text-black"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            name="name"
                            value={contactForm.name}
                        >
                        </input>
                        {errors.name ? (
                            <p className="error-text">
                                Please enter your name (required*)
                            </p>
                        ) : null}
                    </div>
                    <div className="flex-row space-between my-2">
                        <input
                            className="login-input rounded-2xl m-3 text-black"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            name="email"
                            value={contactForm.email}
                        >
                        </input>
                        {errors.email ? (
                            <p className="error-text">
                                Please enter a valid email (required*)
                            </p>
                        ) : null}
                    </div>
                    <div className="flex-row space-between my-2">
                        <div className="flex-row space-between my-2">
                            <label htmlFor="issue">Reason for contact:</label>
                        </div>
                        <select
                            id="issue"
                            value={contactForm.issue}
                            onChange={handleChange}
                            name="issue"
                            className="text-black"
                        >
                            <option value="">--Select--</option>
                            <option value="billings">Billings</option>
                            <option value="technical">Technical Problems</option>
                            <option value="report">Report Inappropriate Contents</option>
                            <option value="hello">Just wanna say hello!</option>
                            <option value="policies">Site Policies</option>
                            <option value="partnership">Partnership Opportunities</option>
                        </select>
                        {errors.issue ? (
                            <p className="error-text">
                                Please choose from one of the options (required*)
                            </p>
                        ) : null}
                    </div>
                    <div className="flex-row space-between my-2">
                        <textarea
                            placeholder="Enter a brief message"
                            onChange={handleChange}
                            name="comment"
                            value={contactForm.comment}
                            className="w-80 login-input rounded-2xl m-3 text-black"
                        >
                        </textarea>
                        {errors.comment ? (
                            <p className="error-text">
                                Comment has to be more than 10 characters (required*)
                            </p>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className='transition ease-in-out delay-150 bg-red-900 cursor-pointer rounded-2xl p-2 m-3 hover:bg-rose-950'
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;