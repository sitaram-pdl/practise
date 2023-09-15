import axios from 'axios';
import { toast } from 'react-toastify';

const postMailChimp = (email, event) => {
  const mailChimpEndpoint = import.meta.env.VITE_MAILCHIMPER;
  const params = new URLSearchParams();
  params.append('EMAIL', email);
  params.append(import.meta.env.VITE_MAILCHIMPER_ID, '');

  const mailChimpUrl = mailChimpEndpoint + params.toString();

  axios
    .post(mailChimpUrl)
    .then((response) => {
      console.log(response.data);
      toast.success('Email has been submitted.');
      event.target.reset();
    })
    .catch((error) => {
      console.log(error);
      toast.error('Sorry, an error occurred.');
    });
};

export default postMailChimp;
