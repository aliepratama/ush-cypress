import { generateUser, generateUserDetail } from "../../generateDummy"

// Generate dummy user
const userDetail = generateUserDetail()
const user = generateUser(userDetail)
console.log(userDetail)

describe("Register User", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Navigate to URL", () => {
    // Memastikan ada elemen logo
    cy.get("a > img")
      .invoke("attr", "alt")
      .should("eq", "Website for automation practice")
    // Klik tombol login
    cy.get("a").contains("Login").click()
    // Memastikan URL berubah ke login
    cy.url().should("contain", "login")
    // Selesai!
  })
  it("Register User", () => {
    // Daftar akun baru
    cy.registerNewAccount(user, userDetail)
    // Memastikan nama akun sudah sesuai
    cy.checkUsername(userDetail.name)
    // Hapus akun
    cy.deleteAccount()
    // Selesai!
  })
})

describe("Login User", () => {
  beforeEach(() => {
    cy.visit("/login")
  })
  it("Login User with Correct Email and Password", () => {
    // Daftar akun baru
    cy.registerNewAccount(user, userDetail, true)
    // Mengisi email pada form
    cy.getQa('login-email', 'input').type(userDetail.email)
    // Mengisi password pada form
    cy.getQa('login-password', 'input').type(userDetail.password)
    // Klik tombol login
    cy.get('button').contains('Login').click()
    // Memastikan nama akun sudah sesuai
    cy.checkUsername(userDetail.name)
    // Hapus akun
    cy.deleteAccount()
    // Selesai!
  })
  it("Login User with Incorrect Email and Password", () => {
    // Daftar akun baru
    cy.registerNewAccount(user, userDetail, true)
    // Mengisi email pada form
    cy.getQa('login-email', 'input').type(userDetail.email)
    // Mengisi password pada form
    cy.getQa('login-password', 'input').type('salah')
    // Klik tombol login
    cy.get('button').contains('Login').click()
    // Memastikan pesan gagal
    cy.get('p').should('contain.text', 'Your email or password is incorrect!')
    // Selesai!
  })
})
