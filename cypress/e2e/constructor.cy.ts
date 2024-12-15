const clcikIngredient =(ingredientsName: string[]) => {
    ingredientsName.forEach((ingredientName)=>{
        cy.get('div section div ul li').contains(ingredientName).parent().contains('Добавить').click()
    })
}
const checkIngredient = (ingredientsName: string[]) => {
    ingredientsName.forEach((ingredientName)=>{
        cy.get('section div div span span').should('contain', ingredientName)
    })
}

const checkIfEmpty = () => {
    cy.get('section div').contains('Выберите булки').should('exist')
    cy.get('section div').contains('Выберите начинку').should('exist')
}

const modalShould = (exist: string) => {
    cy.get('div[id^=modals] div').should(exist)        
}

const clickBun = () => {
    cy.get('div section div ul li').contains('Тестовая булка').click()
    modalShould('exist')
}

const clickX = () => {
    cy.get('div[id^=modals] div div button svg').click()
    modalShould('not.exist')
}

const clickOverlay = () => {
    cy.get('body').click(0,0);
    cy.get('div[id^=modals] div').should('not.exist')
}

describe('Ingredients', function () {    
    this.beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300, 800);
        cy.visit('/');
    });

    it("ADD BUN", function () {
        clcikIngredient(['Тестовая булка'])
        checkIngredient(['Тестовая булка (верх)','Тестовая булка (низ)'])
    });    

    it("ADD MEAT", function () {
        const meatList = ['Тестовое мясо 1', 'Тестовое мясо 2', 'Тестовое мясо 3']
        clcikIngredient(meatList)
        checkIngredient(meatList)
    });

    it("ADD SOUCE", function () {
        const souceList = ['Тестовый соус']
        clcikIngredient(souceList)
        checkIngredient(souceList)
    });
}) 


describe('Ingerdient Modal: Open and Close', function () {

    this.beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300, 800);
        cy.visit('/');
    });

    it("Ingerdient Modal: Open and Close X", function () {
        clickBun()
        clickX()
    }); 

    it("Ingerdient Modal: Open and Close Overlay", function () {
        clickBun()
        clickOverlay()
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
        cy.visit('/');
    });

    it("Ordering", function () {
        const clickingList = ['Тестовая булка', 'Тестовый соус', 'Тестовое мясо 1']
        const checkingList = ['Тестовая булка (верх)', 'Тестовая булка (низ)', 'Тестовый соус', 'Тестовое мясо 1']
        clcikIngredient(clickingList)
        checkIngredient(checkingList)
        cy.get('section div button').contains('Оформить заказ').click()
        modalShould('exist')
        cy.get('div[id^=modals] h2').contains('123456')
        clickX()
        checkIfEmpty()
    });
}) 