import { generateUser, generateUserDetail } from "../../generateDummy"

// Generate dummy user
const userDetail = generateUserDetail()
const user = generateUser(userDetail)
console.log(userDetail)

describe("Register User", () => {
  it("Navigate to URL", () => {
    // Pergi ke URL yang dituju
    cy.visit("/").then(() => {
      // Memastikan ada elemen logo
      cy.get("a > img")
        .invoke("attr", "alt")
        .should("eq", "Website for automation practice")
    })
    // Klik tombol login
    cy.get("a").contains("Login").click()
    // Memastikan URL berubah ke login
    cy.url().should("contain", "login")
  })
  it("Register User", () => {
    cy.visit("/login")
    // Memastikan ada tulisan 'New User Signup!'
    cy.get("h2").should("contain.text", "New User Signup!")
    // Memasukkan username pada form
    cy.get('input[data-qa="signup-name"]').type(user.name)
    // Memasukkan email pada form
    cy.get('input[data-qa="signup-email"]').type(user.email)
    // Klik tombol signup
    cy.get('button').contains("Signup").click()
    // Memastikan URL berubah ke signup
    cy.url().should("contain", "signup")
    // Memastikan ada tulisan 'Enter Account Information'
    cy.get('b').should('contain.text', 'Enter Account Information')
    // Memasukkan jenis kelamin pada form
    if (userDetail.sex == 'male') {
      cy.get('input[type=radio][value=Mr]').click()
    } else {
      cy.get('input[type=radio][value=Mrs]').click()
    }
    // Memasukkan password pada form
    cy.get('input[type=password][data-qa="password"]').type(userDetail.password)
    // Memasukkan tanggal lahir pada form
    cy.get('select[data-qa="days"]').select(userDetail.birthDate.getDate())
    cy.get('select[data-qa="months"]').select(userDetail.birthDate.getMonth())
    cy.get('select[data-qa="years"]').select(String(userDetail.birthDate.getFullYear()))
    // Mencentang newsletter dan offer jika subsNews dan subsOffer bernilai true
    if (userDetail.subsNews) {
      cy.get('input[type="checkbox"][name="newsletter"]').check()
    }
    if (userDetail.subsOffer) {
      cy.get('input[type="checkbox"][name="optin"]').check()
    }
    // Memasukkan nama depan
    cy.get('input[data-qa="first_name"]').type(userDetail.firstName)
    // Memasukkan nama belakang
    cy.get('input[data-qa="last_name"]').type(userDetail.lastName)
    // Memasukkan nama perusahaan
    cy.get('input[data-qa="company"]').type(userDetail.companyName)
    // Memasukkan alamat pada form
    cy.get('input[data-qa="address"]').type(userDetail.address1)
    cy.get('input[data-qa="address2"]').type(userDetail.address2)
    // Memasukkan negara, provinsi, kota, kode pos, dan nomor telepon
    cy.get('select[data-qa="country"]').select(userDetail.country)
    cy.get('input[data-qa="state"]').type(userDetail.state)
    cy.get('input[data-qa="city"]').type(userDetail.city)
    cy.get('input[data-qa="zipcode"]').type(userDetail.zipcode)
    cy.get('input[data-qa="mobile_number"]').type(userDetail.phone)
    // Klik tombol 'Create Account'
    cy.get('button').contains('Create Account').click()
    // Memastikan url berubah ke account_created
    cy.url().should("contain", "account_created")
    // Memastikan ada tulisan 'Account Created!'
    cy.get('h2').should('contain.text', 'Account Created!')
    // Klik tombol Continue
    cy.get('a').contains('Continue').click()
    // Memastikan nama akun sudah sesuai
    cy.get('ul.nav.navbar-nav > li:last-of-type > a').should('contain.text', userDetail.name)
    // Klik menu 'Delete Account'
    cy.get('a').contains('Delete Account').click()
    // Memastikan ada tulisan 'Account Deleted!'
    cy.get('h2').should('contain.text', 'Account Deleted!')
    // Klik tombol Continue
    cy.get('a').contains('Continue').click()
    // Selesai!
  })
})
