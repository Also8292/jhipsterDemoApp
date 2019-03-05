/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StudentsComponentsPage, StudentsDeleteDialog, StudentsUpdatePage } from './students.page-object';

const expect = chai.expect;

describe('Students e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let studentsUpdatePage: StudentsUpdatePage;
    let studentsComponentsPage: StudentsComponentsPage;
    let studentsDeleteDialog: StudentsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Students', async () => {
        await navBarPage.goToEntity('students');
        studentsComponentsPage = new StudentsComponentsPage();
        await browser.wait(ec.visibilityOf(studentsComponentsPage.title), 5000);
        expect(await studentsComponentsPage.getTitle()).to.eq('Students');
    });

    it('should load create Students page', async () => {
        await studentsComponentsPage.clickOnCreateButton();
        studentsUpdatePage = new StudentsUpdatePage();
        expect(await studentsUpdatePage.getPageTitle()).to.eq('Create or edit a Students');
        await studentsUpdatePage.cancel();
    });

    it('should create and save Students', async () => {
        const nbButtonsBeforeCreate = await studentsComponentsPage.countDeleteButtons();

        await studentsComponentsPage.clickOnCreateButton();
        await promise.all([
            studentsUpdatePage.setPrenomInput('prenom'),
            studentsUpdatePage.setNomInput('nom'),
            studentsUpdatePage.setAgeInput('5')
        ]);
        expect(await studentsUpdatePage.getPrenomInput()).to.eq('prenom');
        expect(await studentsUpdatePage.getNomInput()).to.eq('nom');
        expect(await studentsUpdatePage.getAgeInput()).to.eq('5');
        await studentsUpdatePage.save();
        expect(await studentsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await studentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Students', async () => {
        const nbButtonsBeforeDelete = await studentsComponentsPage.countDeleteButtons();
        await studentsComponentsPage.clickOnLastDeleteButton();

        studentsDeleteDialog = new StudentsDeleteDialog();
        expect(await studentsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Students?');
        await studentsDeleteDialog.clickOnConfirmButton();

        expect(await studentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
