class User < ApplicationRecord
  def stripe_customer_id
    if customers.empty?
      customer = Stripe::Customer.create(
        email: email,
        source: default_account.stripe_token
      )
      customer.create(stripe_customer_id: customer.id)
    end

    customers.first.stripe_customer_id
  end
end
