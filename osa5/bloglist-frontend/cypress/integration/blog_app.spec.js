describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("login");
  });

  it("user can login with correct credentials", () => {
    cy.get("input:first").type("mluukkai");
    cy.get("input:last").type("salainen");
    cy.contains("login").click();
    cy.contains("logout").click();
  });

  it("login fails with incorrect credentials", () => {
    cy.get("input:first").type("m");
    cy.get("input:last").type("s");
    cy.contains("login").click();
    cy.get(".error").contains("Invalid username or password");
  });

  it("user can create blogs", () => {
    cy.get("input:first").type("mluukkai");
    cy.get("input:last").type("salainen");
    cy.contains("login").click();
    cy.contains("create new blog").click();
    cy.get("#title").type("test blog");
    cy.get("#author").type("author");
    cy.get("#url").type("url");
    cy.contains("create").click();
    cy.contains("Title: test blog");
  });

  it("blog can be liked", () => {
    cy.get("input:first").type("mluukkai");
    cy.get("input:last").type("salainen");
    cy.contains("login").click();
    cy.contains("create new blog").click();
    cy.get("#title").type("test blog");
    cy.get("#author").type("author");
    cy.get("#url").type("url");
    cy.contains("create").click();
    cy.contains("Title: test blog");
    cy.contains("view").click();
    cy.contains("Likes: 0");
    cy.contains("like").click();
    cy.contains("Likes: 1");
  });

  it("blog can be deleted", () => {
    cy.get("input:first").type("mluukkai");
    cy.get("input:last").type("salainen");
    cy.contains("login").click();
    cy.contains("create new blog").click();
    cy.get("#title").type("test blog");
    cy.get("#author").type("author");
    cy.get("#url").type("url");
    cy.contains("create").click();
    cy.contains("Title: test blog");
    cy.contains("view").click();
    cy.contains("delete").click();
    cy.contains("Title: test blog").should("not.exist");
  });

  it("blog can only be deleted by its creator", () => {
    const user = {
      name: "Testi Testinen",
      username: "testi",
      password: "testi",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
    cy.get("input:first").type("testi");
    cy.get("input:last").type("testi");
    cy.contains("login").click();
    cy.contains("create new blog").click();
    cy.get("#title").type("toisen käyttäjän blogi");
    cy.get("#author").type("test2");
    cy.get("#url").type("test2");
    cy.contains("create").click();
    cy.contains("Title: toisen käyttäjän blogi");
    cy.contains("logout").click();
    cy.get("input:first").type("mluukkai");
    cy.get("input:last").type("salainen");
    cy.contains("login").click();
    cy.contains("view").click();
    cy.contains("delete").should("not.exist");
  });

  it("blogs are sorted by likes", () => {
    cy.get("input:first").type("mluukkai");
    cy.get("input:last").type("salainen");
    cy.contains("login").click();
    cy.contains("create new blog").click();
    cy.get("#title").type("test blog1");
    cy.get("#author").type("author1");
    cy.get("#url").type("url1");
    cy.contains("create").click();
    cy.contains("create new blog").click();
    cy.get("#title").type("test blog2");
    cy.get("#author").type("author2");
    cy.get("#url").type("url2");
    cy.contains("create").click();
    cy.contains("view").click();
    cy.contains("view").click();
    cy.intercept("/api/blogs").as("getBlogs");
    cy.contains("like").click();
    cy.wait("@getBlogs");
    cy.contains("Likes").first().contains("Likes: 1");
    cy.contains("url2").next().contains("like").click();
    cy.wait("@getBlogs");
    cy.contains("url2").next().contains("like").click();
    cy.wait("@getBlogs");
    cy.contains("Title").first().contains("test blog2");
  });
});
