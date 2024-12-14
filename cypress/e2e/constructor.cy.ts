describe('Ingredients', function () {
    this.beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000')
    });

    it("ADD BUN", function () {
        cy.get('div section div ul li').contains('Тестовая булка').parent().contains('Добавить').click()
        cy.get('section div div span span').should('contain', 'Тестовая булка (верх)')
        cy.get('section div div span span').should('contain', 'Тестовая булка (низ)')
    });    

    it("ADD MEAT", function () {
        cy.get('div section div ul li').contains('Тестовое мясо 1').parent().contains('Добавить').click()
        cy.get('div section div ul li').contains('Тестовое мясо 2').parent().contains('Добавить').click()
        cy.get('div section div ul li').contains('Тестовое мясо 3').parent().contains('Добавить').click()
        cy.get('section div div span span').should('contain', 'Тестовое мясо 1')
        cy.get('section div div span span').should('contain', 'Тестовое мясо 2')
        cy.get('section div div span span').should('contain', 'Тестовое мясо 3')
    });

    it("ADD SOUCE", function () {
        cy.get('div section div ul li').contains('Тестовый соус').parent().contains('Добавить').click()
        cy.get('section div div span span').should('contain', 'Тестовый соус')
    });
}) 


describe('Ingerdient Modal: Open and Close', function () {
    this.beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000')
    });

    it("Ingerdient Modal: Open and Close X", function () {
        cy.get('div section div ul li').contains('Тестовая булка').click()
        cy.get('div[id^=modals] div div button svg').should('exist')
        cy.get('div[id^=modals] div div button svg').click()
        cy.get('div[id^=modals] div').should('not.exist')
    }); 

    it("Ingerdient Modal: Open and Close Overlay", function () {
        cy.get('div section div ul li').contains('Тестовая булка').click()
        cy.get('div[id^=modals] div').should('exist')
        cy.get('body').click(0,0);
        cy.get('div[id^=modals] div').should('not.exist')
    }); 
}) 


describe('User Order', function () {
    this.beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
        cy.setCookie(
          'accessToken',
          'Bearer ThisIsAnAccessToken'
        );
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000')
    });

    it("Ordering", function () {
        cy.get('div section div ul li').contains('Тестовая булка').parent().contains('Добавить').click()
        cy.get('div section div ul li').contains('Тестовый соус').parent().contains('Добавить').click()
        cy.get('div section div ul li').contains('Тестовое мясо 1').parent().contains('Добавить').click()
        cy.get('section div div span span').should('contain', 'Тестовый соус')
        cy.get('section div div span span').should('contain', 'Тестовое мясо 1')
        cy.get('section div div span span').should('contain', 'Тестовая булка (верх)')
        cy.get('section div div span span').should('contain', 'Тестовая булка (низ)')
        cy.get('section div button').contains('Оформить заказ').click()
        cy.get('div[id^=modals]').should('exist')
        cy.get('div[id^=modals] h2').contains('123456')
        cy.get('div[id^=modals] div div button svg').click()
        cy.get('div[id^=modals] div').should('not.exist')
        cy.get('section div').contains('Выберите булки').should('exist')
        cy.get('section div').contains('Выберите начинку').should('exist')
    });
}) 