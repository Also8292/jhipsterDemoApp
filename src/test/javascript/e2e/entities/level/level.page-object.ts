import { element, by, ElementFinder } from 'protractor';

export class LevelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-level div table .btn-danger'));
    title = element.all(by.css('jhi-level div h2#page-heading span')).first();

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

export class LevelUpdatePage {
    pageTitle = element(by.id('jhi-level-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    yearsInput = element(by.id('field_years'));
    students_levelSelect = element(by.id('field_students_level'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setYearsInput(years) {
        await this.yearsInput.sendKeys(years);
    }

    async getYearsInput() {
        return this.yearsInput.getAttribute('value');
    }

    async students_levelSelectLastOption() {
        await this.students_levelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async students_levelSelectOption(option) {
        await this.students_levelSelect.sendKeys(option);
    }

    getStudents_levelSelect(): ElementFinder {
        return this.students_levelSelect;
    }

    async getStudents_levelSelectedOption() {
        return this.students_levelSelect.element(by.css('option:checked')).getText();
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

export class LevelDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-level-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-level'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
