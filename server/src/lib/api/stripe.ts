import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27'
});

export const StripeConnect = {
  connect: async (code: string) => {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code
    });
    return response.stripe_user_id;
  }
};
