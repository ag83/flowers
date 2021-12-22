import { SERVER_URL } from '/packages/common/constants/constants';

describe("ui test", () => {

    const flowerId = 1;

    it('go to flower page', () => {
        cy.visit('/');
        cy.get(`#fl-item-${flowerId} a`).click().url().should('contain', flowerId);

    });

    it('should update flower stock', () => {
        cy.server();
        cy.route({
            method: 'PATCH',
            url: `${SERVER_URL}/flowers/${flowerId}/status`,
            delay: 1000
        }).as('changeStock');

        const increase = 10;
        let compareValue;
        cy.visit(`/${flowerId}`);
        cy.get('.fl-stock-input input').invoke('val').then((val) => {
            compareValue = parseInt(val) + increase;
            cy.get('.fl-stock-input  input').clear().type(compareValue);
            cy.get('.fl-stock-submit').click();
            cy.wait('@changeStock');
            cy.visit('/');
            return cy.get(`.fl-grid #fl-item-${flowerId}`).find('.fl-card-stock').invoke('text');
        }).then((text) => {
            const updatedValue = parseInt(text.replace('Stock: ', ''));
            expect(compareValue).equal(updatedValue);
        });

    });
});