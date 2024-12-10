/// <reference types="cypress" />

describe('Temp 컴포넌트 테스트', () => {
  it('Does not do much!', () => {
    cy.visit('/'); // 홈페이지 방문
    // data-testid로 특정 버튼만 선택
    cy.get('[data-testid="count-button"]').should('have.text', 'count is 0');

    // 첫번째 클릭
    cy.get('[data-testid="count-button"]').click();
    cy.get('[data-testid="count-button"]').should('have.text', 'count is 1');

    // 두번째 클릭
    cy.get('[data-testid="count-button"]').click();
    cy.get('[data-testid="count-button"]').should('have.text', 'count is 2');

    // 세번째 클릭
    cy.get('[data-testid="count-button"]').click();
    cy.get('[data-testid="count-button"]').should('have.text', 'count is 3');

    cy.get('[data-testid="count-button"]').click();
    cy.get('[data-testid="count-button"]').click();
    cy.get('[data-testid="count-button"]').click();
    cy.get('[data-testid="count-button"]').should('have.text', 'count is 6');
  });
});
