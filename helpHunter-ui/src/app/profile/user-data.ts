interface Services {
  TYPE_OF_SERVICE: String,
  CATEGORY: String,
  MIN_PRICE: String,
  MAX_PRICE: String,
  OPERATING_MODE: String,
  DESCRIPTION: String
}

export interface UserData {
  FIRST_NAME: String,
  LAST_NAME: String,
  PHONE_NUMBER: String,
  EMAIL: String,
  AVATAR: String,
  ADDRESS: String,
  EXPERT: Boolean,
  ADDITIONAL_INFO: String,
  SERVICES: Services;
}
