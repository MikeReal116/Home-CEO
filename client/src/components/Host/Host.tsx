import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { Formik, Form } from 'formik';

import TextField from '../Form/TextField';
import { useStyles } from './styles';
import { ListingType } from '../../lib/graphql/globalTypes';
import { formValidation } from '../../lib/utils/createListingSchema';
import { errorNotification } from '../../lib/notifications/error';
import { CREATE_LISTING } from '../../lib/graphql/mutations/createListing';
import {
  CreateListing,
  CreateListingVariables
} from '../../lib/graphql/mutations/createListing/__generated__/CreateListing';

interface FileInput {
  base64: string;
  file: {
    type: string;
  };
  size: string;
}

const Host = () => {
  const initialValues = {
    apartment: ListingType.HOUSE,
    title: '',
    description: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    price: 0,
    numOfGuest: 0
  };

  const [apartment, setApartment] = useState(ListingType.HOUSE);
  const [image, setImage] = useState('');

  const classes = useStyles();

  const [createListingFn, { loading, error, data }] = useMutation<
    CreateListing,
    CreateListingVariables
  >(CREATE_LISTING);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApartment((event.target as HTMLInputElement).value as ListingType);
  };

  const checkImage = (input: FileInput) => {
    const type = input.file.type.split('/')[1];
    const size = input.size.split(' ')[0];
    if (!(type === 'png' || type === 'jpg' || type === 'jpeg')) {
      return errorNotification('Select a png or jpeg image');
    }
    if (Number(size) > 1000) {
      return errorNotification('Select a file less than 1mb');
    }
    setImage(input.base64);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (data?.createListing?.id) {
    return <Redirect to={`/listing/${data.createListing.id}`} />;
  }

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={formValidation}
      onSubmit={(values) => {
        const address = `${values.address}, ${values.postalCode}, ${values.city}, ${values.country}`;

        createListingFn({
          variables: {
            input: {
              address,
              image,
              title: values.title,
              description: values.description,
              numOfGuests: +values.numOfGuest,
              price: +values.price * 100,
              type: apartment
            }
          }
        });
      }}
    >
      {(props) => (
        <Form>
          <Container maxWidth='md' className={classes.root}>
            {error && errorNotification('Could not create listing')}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>
                    Select Apartment Type
                  </FormLabel>
                  <RadioGroup
                    aria-label='apartment-type'
                    name='apartment'
                    row
                    onChange={handleRadioChange}
                    value={apartment}
                  >
                    <FormControlLabel
                      value={ListingType.APARTMENT}
                      control={<Radio color='primary' />}
                      label='Apartment'
                    />
                    <FormControlLabel
                      value={ListingType.HOUSE}
                      control={<Radio color='primary' />}
                      label='House'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Title'
                  name='title'
                  placeholder='Title of listing. Max 200 characters'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Description'
                  name='description'
                  placeholder='Description of the listing. Max 500 characters'
                  multiline={true}
                  maxRows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Address'
                  name='address'
                  placeholder='Street name and number'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Postal code'
                  name='postalCode'
                  placeholder='Postal code for the listing'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='City'
                  name='city'
                  placeholder='City where listing is located'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Country'
                  name='country'
                  placeholder='Country where listing is located'
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label='Price'
                  name='price'
                  placeholder='Price in euros'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Number Of Guest'
                  name='numOfGuest'
                  placeholder='Title of listing. Max 200 characters'
                />
              </Grid>
              <Grid item xs={12}>
                <FileBase64
                  multiple={false}
                  onDone={(base64: FileInput) => {
                    checkImage(base64);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!(props.dirty && props.isValid && image)}
                >
                  Create Listing
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Host;
