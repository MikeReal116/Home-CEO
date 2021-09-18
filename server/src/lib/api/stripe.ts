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
  },
  charge: async (amount: number, stripeAccount: string, source: string) => {
    try {
      const charge = await stripe.charges.create(
        {
          amount,
          currency: 'eur',
          application_fee_amount: Math.round(0.05 * amount),
          source
        },
        {
          stripeAccount: `${stripeAccount}`
        }
      );

      if (charge.status !== 'succeeded') {
        throw new Error('Payment was not successful');
      }
    } catch (error) {
      throw new Error(`Could not connect to Stripe to make charge: ${error}`);
    }
  }
};
