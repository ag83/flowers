import { SERVER_URL } from '/packages/common/constants/constants';

describe("api calls test", () => {

    it("POST /flowers creates a new flower", () => {
        let initialLen;
        cy.visit("/");
        cy.get(".fl-grid").find(".fl-card").then((cards) => {
            initialLen = Cypress.$(cards).length;
            return cy.fixture('flowerRequest.json');
        }).then((flowerRequest) => {
            return cy.request({
                method: 'POST',
                url: `${SERVER_URL}/flowers`,
                body: flowerRequest,
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              });
        }).then((res) => {
            cy.reload();
            cy.get('.fl-grid').find('.fl-card').should('have.length', initialLen + 1);
        });
    });

    it("POST /flowers with wrong json returns bad request", () => {
        cy.fixture('flowerRequest.json').then((flowerRequest) => {
            delete flowerRequest.floristId;
            return cy.request({
                method: 'POST',
                url: `${SERVER_URL}/flowers`,
                body: flowerRequest,
                failOnStatusCode: false,
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              });
        }).then((res) => {
            expect(res.status).to.eq(400)
        });
    });

    it("PATCH /flowers/status delivered calls SSE update on frontend", () => {
        let initialValue;
        let updateValue;
        let statusUpdateRequest;
        let statusFlowerId;
        cy.visit("/");
        cy.fixture('statusUpdate.json').then((statusUpdate) => {
            console.log(statusUpdate);
            statusUpdateRequest = statusUpdate;
            updateValue = statusUpdate.amount;
            statusFlowerId = statusUpdate.flowerId;
            return cy.get(`.fl-grid #fl-item-${statusFlowerId}`).find('.fl-card-stock').invoke('text');
        }).then((text) => {
            initialValue = parseInt(text.replace('Stock: ', ''));
            return cy.request({
                method: 'PATCH',
                url: `${SERVER_URL}/flowers/status`,
                body: statusUpdateRequest,
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              });
        }).then((res) => {
            return cy.wait(1000); // wait for 1s SSE update, should be changed to event waiting
        }).then(() => {
            return cy.get(`.fl-grid #fl-item-${statusFlowerId}`).find('.fl-card-stock').invoke('text');
        }).then((text) => {
            const updatedValue = parseInt(text.replace('Stock: ', ''));
            expect(initialValue + updateValue).equal(updatedValue);
        });
    });

});