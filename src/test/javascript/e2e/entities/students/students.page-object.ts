import { element, by, ElementFinder } from 'protractor';

export class StudentsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-students div table .btn-danger'));
    title = element.all(by.css('jhi-students div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class StudentsUpdatePage {
    pageTitle = element(by.id('jhi-students-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    prenomInput = element(by.id('field_prenom'));
    nomInput = element(by.id('field_nom'));
    ageInput = element(by.id('field_age'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setPrenomInput(prenom) {
        await this.prenomInput.sendKeys(prenom);
    }

    async getPrenomInput() {
        return this.prenomInput.getAttribute('value');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setAgeInput(age) {
        await this.ageInput.sendKeys(age);
    }

    async getAgeInput() {
        return this.ageInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class StudentsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-students-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-students'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
