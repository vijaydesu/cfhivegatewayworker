export default /* GraphQL */ `
  type Query {
  getCustomer(id: ID!): Customer
  getCustomerwithPhone(phone: String!): Customer
  getCustomerwithEmail(email: String!): Customer
  getAllOffers(id: String!): allOffers
}

type Mutation {
  createCarwashRegistration(cid: String!, firstName: String!, lastName: String!): carwashSubscription!
  purchaseCarwashSubscription(cid: String!, locationId: String!, saleId: String!, transactionId: String!): carwashSubscription!
  cancelCarwashSubscription(cid: String!, subscriptionId: String!, reason: String!, cancellationType: String!): carwashSubscription!
}

type Customer {
  id: ID!
  firstName: String
  lastName: String
  phone: String
  email: String
  loyalty_referral: [loyalty_referral_details]
  wallet: [loyalty_wallet]
  carwash: [sub_details]
}

type loyalty_referral_details {
  id: ID!
  referral_code: String
  referral_path: String
}

type loyalty_wallet {
  pointsBalance: String
  caseyscash: String
  fuelRewards: String
}

type sub_details {
  id: ID!
  locations: String
  subscriptionType: String
  orderNumber: String
}

type carwashSubscription {
  cid: String!
  firstName: String!
  lastName: String!
  transactionId: String!
  email: String!
  cancellationReason: String!
  hasSubscription: Boolean
  locationId: String
  message: String
  productId: String
  subscriptionId: String
  productName: String
  saleName: String
  saleId: String
}

type allOffers implements OfferDetails {
  id: String!
  offerId: String
  offerUUId: String
  offerName: String
  description: String
  expiryDays: Int
  offerStatus: String
  expirationDate: String
  imageURL: String
  lifeTimeSavings: [lifeSavings]
}

type lifeSavings {
  savings: String
}

interface OfferDetails {
  id: String!
  offerId: String
  offerUUId: String
  offerName: String
  description: String
  expiryDays: Int
  offerStatus: String
  expirationDate: String
  imageURL: String
}
`