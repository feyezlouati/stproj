function valid(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.sname === "") {
        error.sname = "Name should not be empty";
    }

    if (values.semail === "") {
        error.semail = "Email should not be empty";
    } else if (!email_pattern.test(values.semail)) {
        error.semail = "Email didn't match";
    }

    if (values.spassword === "") {
        error.spassword = "Password should not be empty";
    } else if (!password_pattern.test(values.spassword)) {
        error.spassword = "Password should contain at least 1 lowercase, 1 uppercase, and be at least 8 characters long";
    }
    if(values.sposition === ""){
        error.sposition ="please select your position";
    }

    return error;
}

export default valid;
