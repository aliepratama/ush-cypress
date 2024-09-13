Cypress.Commands.add("getQa", (selector, element = '', ...args) => {
    return cy.get(`${element}[data-qa=${selector}]`, ...args)
})

Cypress.Commands.add("registerNewAccount", (user, userDetail, isLogout = false) => {
    cy.visit("/login")
    // Memastikan ada tulisan 'New User Signup!'
    cy.get("h2").should("contain.text", "New User Signup!")
    // Memasukkan username pada form
    cy.getQa('signup-name', 'input').type(user.name)
    // Memasukkan email pada form
    cy.getQa('signup-email', 'input').type(user.email)
    // Klik tombol signup
    cy.get("button").contains("Signup").click()
    // Memastikan URL berubah ke signup
    cy.url().should("contain", "signup")
    // Memastikan ada tulisan 'Enter Account Information'
    cy.get("b").should("contain.text", "Enter Account Information")
    // Memasukkan jenis kelamin pada form
    if (userDetail.sex == "male") {
        cy.get("input[type=radio][value=Mr]").click()
    } else {
        cy.get("input[type=radio][value=Mrs]").click()
    }
    // Memasukkan password pada form
    cy.getQa('password','input[type=password]').type(userDetail.password)
    // Memasukkan tanggal lahir pada form
    cy.getQa('days', 'select').select(userDetail.birthDate.getDate())
    cy.getQa('months', 'select').select(userDetail.birthDate.getMonth())
    cy.getQa('years', 'select').select(
        String(userDetail.birthDate.getFullYear())
    )
    // Mencentang newsletter dan offer jika subsNews dan subsOffer bernilai true
    if (userDetail.subsNews) {
        cy.get('input[type="checkbox"][name="newsletter"]').check()
    }
    if (userDetail.subsOffer) {
        cy.get('input[type="checkbox"][name="optin"]').check()
    }
    // Memasukkan nama depan
    cy.getQa('first_name', 'input').type(userDetail.firstName)
    // Memasukkan nama belakang
    cy.getQa('last_name', 'input').type(userDetail.lastName)
    // Memasukkan nama perusahaan
    cy.getQa('company', 'input').type(userDetail.companyName)
    // Memasukkan alamat pada form
    cy.getQa('address', 'input').type(userDetail.address1)
    cy.getQa('address2', 'input').type(userDetail.address2)
    // Memasukkan negara, provinsi, kota, kode pos, dan nomor telepon
    cy.getQa('country', 'select').select(userDetail.country)
    cy.getQa('state', 'input').type(userDetail.state)
    cy.getQa('city', 'input').type(userDetail.city)
    cy.getQa('zipcode', 'input').type(userDetail.zipcode)
    cy.getQa('mobile_number', 'input').type(userDetail.phone)
    // Klik tombol 'Create Account'
    cy.get("button").contains("Create Account").click()
    // Memastikan url berubah ke account_created
    cy.url().should("contain", "account_created")
    // Memastikan ada tulisan 'Account Created!'
    cy.get("h2").should("contain.text", "Account Created!")
    // Klik tombol Continue
    cy.get("a").contains("Continue").click()
    // Logout akun jika dibutuhkan
    if (isLogout) {
        cy.get("a").contains("Logout").click()
    }
})

Cypress.Commands.add("checkUsername", (username) => {
    // Mengecek berdasarkan username path
    return cy.get('ul.nav.navbar-nav > li:last-of-type > a').should('contain.text', username)
})

Cypress.Commands.add("deleteAccount", () => {
    // Klik menu 'Delete Account'
    cy.get('a').contains('Delete Account').click()
    // Memastikan ada tulisan 'Account Deleted!'
    cy.get('h2').should('contain.text', 'Account Deleted!')
    // Klik tombol Continue
    cy.get('a').contains('Continue').click()
    // Selesai!
})
