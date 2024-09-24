const validation = (values) => {
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!values.email) {
        errors.email = "L'e-mail est requis";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "L'adresse e-mail n'est pas valide";
    }

    if (!values.password) {
        errors.password = "Le mot de passe est requis";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Le mot de passe doit contenir au moins 1 minuscule, 1 majuscule et au moins 8 caractères.";
    }

    return errors;
};

export default validation;
