import { faker } from "@faker-js/faker"

export const generateUser = (userDetail = undefined) => ({
  name: userDetail ? userDetail.name : faker.person.fullName(),
  email: userDetail ? userDetail.email : faker.internet.email(),
})

export const generateUserDetail = () => {
  const sex = faker.person.sex()
  const firstName = faker.person.firstName({ sex: sex })
  const lastName = faker.person.lastName({ sex: sex })
  const name = faker.person.fullName({
    firstName: firstName,
    lastName: lastName,
    sex: sex,
  })
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  })
  const password = faker.internet.password()
  const birthDate = faker.date.birthdate({
    mode: "age",
    min: 18,
    max: 60,
  })
  const subsNews = faker.datatype.boolean({ probability: 0.9 })
  const subsOffer = faker.datatype.boolean({ probability: 0.9 })
  const companyName = faker.company.buzzNoun()
  const address1 = faker.location.streetAddress({ useFullAddress: true })
  const address2 = faker.location.streetAddress({ useFullAddress: true })
  const country = faker.helpers.arrayElement([
    "United States",
    "Canada",
    "Australia",
    "Israel",
    "New Zealand",
    "Singapore",
  ])
  const state = faker.location.state()
  const city = faker.location.city()
  const zipcode = faker.location.zipCode()
  const phone = faker.phone.number({ style: "international" })
  return {
    sex,
    lastName,
    firstName,
    name,
    email,
    password,
    birthDate,
    subsNews,
    subsOffer,
    companyName,
    address1,
    address2,
    country,
    state,
    city,
    zipcode,
    phone,
  }
}
