// cypress/e2e/signup.cy.ts

describe("회원가입 테스트", () => {
  beforeEach(() => {
    cy.visit("/"); // 실제 라우트에 맞게 수정 필요
  });

  it("모든 필드가 비어있을 때 제출 버튼이 비활성화되어 있어야 한다", () => {
    cy.get('[data-testid="submit-button"]').should("be.disabled");
  });

  it("이메일 유효성 검사가 실시간으로 동작해야 한다", () => {
    cy.get('[data-testid="email-input"]')
      .type("invalid-email")
      .should("have.value", "invalid-email");

    cy.get('[data-testid="email-error"]')
      .should("be.visible")
      .should("contain", "올바른 이메일 형식이 아닙니다");

    cy.get('[data-testid="email-input"]').clear().type("valid@email.com");

    cy.get('[data-testid="email-error"]').should("not.exist");
  });

  it("닉네임 유효성 검사가 실시간으로 동작해야 한다", () => {
    // 너무 짧은 닉네임
    cy.get('[data-testid="nickname-input"]')
      .type("ab")
      .should("have.value", "ab");

    cy.get('[data-testid="nickname-error"]')
      .should("be.visible")
      .should("contain", "닉네임은 3-10자");

    // 특수문자 포함
    cy.get('[data-testid="nickname-input"]').clear().type("user@123");

    cy.get('[data-testid="nickname-error"]').should("be.visible");

    // 올바른 닉네임
    cy.get('[data-testid="nickname-input"]').clear().type("용기니");

    cy.get('[data-testid="nickname-error"]').should("not.exist");
  });

  it("비밀번호 유효성 검사가 실시간으로 동작해야 한다", () => {
    // 짧은 비밀번호
    cy.get('[data-testid="password-input"]').type("short");

    cy.get('[data-testid="password-error"]').should("be.visible");

    // 특수문자 없는 비밀번호
    cy.get('[data-testid="password-input"]').clear().type("Password1234");

    cy.get('[data-testid="password-error"]').should("be.visible");

    // 올바른 비밀번호
    cy.get('[data-testid="password-input"]').clear().type("Password123!@#");

    cy.get('[data-testid="password-error"]').should("not.exist");
  });

  it("태그 추가 및 삭제가 정상적으로 동작해야 한다", () => {
    // 유효하지 않은 태그 시도
    cy.get('[data-testid="tag-input"]').type("a");

    cy.get('[data-testid="tag-submit"]').click();
    cy.get('[data-testid="tag-error"]').should("be.visible");

    // 올바른 태그 추가
    cy.get('[data-testid="tag-input"]').clear().type("frontend");

    cy.get('[data-testid="tag-submit"]').click();
    cy.get('[data-testid="tag-item-0"]').should("contain", "frontend");

    // 중복 태그 시도
    cy.get('[data-testid="tag-input"]').type("frontend");

    cy.get('[data-testid="tag-submit"]').click();
    cy.get('[data-testid="tag-error"]').should(
      "contain",
      "이미 존재하는 태그입니다"
    );

    // 태그 삭제
    cy.get(`[data-testid="tag-remove-0"]`).click();
    cy.get('[data-testid="tag-item-0"]').should("not.exist");
  });

  it("자기소개 유효성 검사가 실시간으로 동작해야 한다", () => {
    cy.get('[data-testid="introduction-input"]').type("짧은 소개");

    cy.get('[data-testid="introduction-error"]')
      .should("be.visible")
      .should("contain", "15자 이상");

    cy.get('[data-testid="introduction-input"]')
      .clear()
      .type("안녕하세요. 저는 프론트엔드 개발자입니다. 잘 부탁드립니다.");

    cy.get('[data-testid="introduction-error"]').should("not.exist");
  });

  it("모든 필드가 유효할 때 폼 제출이 가능해야 한다", () => {
    // 유효한 데이터 입력
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="nickname-input"]').type("testuser");
    cy.get('[data-testid="password-input"]').type("Password123!@#");
    cy.get('[data-testid="tag-input"]').type("frontend");
    cy.get('[data-testid="tag-submit"]').click();
    cy.get('[data-testid="introduction-input"]').type(
      "안녕하세요. 저는 프론트엔드 개발자입니다. 잘 부탁드립니다."
    );

    // 제출 버튼 활성화 확인
    cy.get('[data-testid="submit-button"]').should("not.be.disabled");

    // 폼 제출
    cy.get('[data-testid="submit-button"]').click();
  });

  it("태그 input의 유효성 검사는 추가 이전에 실행하기 때문에 하나의 태그라도 정상적으로 생성했다면, submit 버튼에 영향을 주지 않아야한다", () => {
    // 유효한 데이터 입력
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="nickname-input"]').type("testuser");
    cy.get('[data-testid="password-input"]').type("Password123!@#");
    cy.get('[data-testid="tag-input"]').type("frontend");
    cy.get('[data-testid="tag-submit"]').click();
    cy.get('[data-testid="introduction-input"]').type(
      "안녕하세요. 저는 프론트엔드 개발자입니다. 잘 부탁드립니다."
    );
    cy.get('[data-testid="tag-input"]').type("#$@$##@#");
    cy.get('[data-testid="tag-submit"]').click();

    cy.get('[data-testid="submit-button"]').should("not.be.disabled");
  });
});
