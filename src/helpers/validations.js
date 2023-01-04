export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';

    return '';
};

export const passwordValidator = password => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';

    return '';
};

export const countryValidator = country => {
    if (!country || country.length <= 0) return ' Country cannot be empty.';

    return '';
};
export const otpVerifyValidator = otp => {
    if (!otp || otp.length <= 0) return ' Otp cannot be empty.';

    return '';
};

export const addressValidator = address => {
    if (!address || address.length <= 0) return ' Address cannot be empty.';

    return '';
};

export const districtValidator = district => {
    if (!district || district.length <= 0) return ' District cannot be empty.';

    return '';
};

export const cityValidator = city => {
    if (!city || city.length <= 0) return ' City cannot be empty.';

    return '';
};

export const nameValidator = name => {
    if (!name || name.length <= 0) return ' Name cannot be empty.';

    return '';
};

export const otpValidator = otp => {
    if (!otp || otp.length <= 0) return ' OTp cannot be empty.';

    return '';
};

export const firstNameValidator = first => {
    if (!first || first.length <= 0) return 'First Name cannot be empty.';

    return '';
};

export const lastNameValidator = last => {
    if (!last || last.length <= 0) return 'Last Name cannot be empty.';

    return '';
};

export const phoneValidator = phone => {
    if (!phone || phone.length <= 0) return ' Phone cannot be empty.';

    return '';
};
export const numberValidator = num => {
    if (!num || num.length <= 0) return ' Number cannot be empty.';

    return '';
};


export const locationValidator = name => {
    if (!name || name.length <= 0) return 'Location cannot be empty.';

    return '';
};


export const postCodeValidator = name => {
    if (!name || name.length <= 0) return 'PostCode/ZIP cannot be empty.';

    return '';
};

export const cardNumValidator = num => {
    if (!num || num.length <= 0) return 'Card Number cannot be empty.';

    return '';
};

export const expDateValidator = num => {
    if (!num || num.length <= 0) return 'Expiry Date cannot be empty.';

    return '';
};

export const cVVValidator = num => {
    if (!num || num.length <= 0) return 'CVV cannot be empty.';

    return '';
};
export const expValidator = name => {
    if (!name || name.length <= 0) return 'Experience cannot be empty.';

    return '';
};