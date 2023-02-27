import * as yup from 'yup'


export const validationSchima = [
    yup.object({
        fullName:yup.string().required('Full name required'),
        address1:yup.string().required('Address 1 required'),
        address2:yup.string().required('Address 1  required'),
        city:yup.string().required('City name required'),
        state:yup.string().required('State name required'),
        zip:yup.string().required('Zip Code required'),
        country:yup.string().required('Country name required')
    }),
    yup.object(),
    yup.object({
        nameOnCard:yup.string().required()
    })
] 