import * as yup from 'yup';

export const formValidation = yup.object().shape({
  apartment: yup.string().required(),
  title: yup
    .string()
    .required()
    .max(50, 'Must not be more than 200 characters'),
  description: yup
    .string()
    .required()
    .max(400, 'Must not be more than 500 characters'),
  address: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  price: yup.number().min(1),
  numOfGuest: yup.number().min(1)
});
