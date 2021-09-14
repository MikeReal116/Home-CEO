import { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router';
import { CircularProgress } from '@material-ui/core';

import { STRIPE_CONNECT } from '../../lib/graphql/mutations/StripeConnect';
import {
  StripeConnect,
  StripeConnectVariables
} from '../../lib/graphql/mutations/StripeConnect/__generated__/StripeConnect';
import { Viewer } from '../../lib/types';

interface Props {
  viewer: Viewer;
  setViewer: React.Dispatch<React.SetStateAction<Viewer>>;
}

const Stripe = ({ viewer, setViewer }: Props) => {
  const [stripeConnectFn, { data, loading, error }] = useMutation<
    StripeConnect,
    StripeConnectVariables
  >(STRIPE_CONNECT, {
    onCompleted: (data) => {
      if (data?.stripeConnect) {
        setViewer({ ...viewer, hasWallet: data.stripeConnect.hasWallet });
      }
    }
  });

  const stripeConnectRef = useRef(stripeConnectFn);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      stripeConnectRef.current({ variables: { input: { code } } });
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Redirect to={`/user/${viewer.id}?stripe_error=error`} />;
  }

  if (data) {
    return <Redirect to={`/user/${viewer.id}`} />;
  }

  return <div></div>;
};

export default Stripe;
