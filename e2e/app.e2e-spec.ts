import { SulisartistsPage } from './app.po';

describe('sulisartists App', function() {
  let page: SulisartistsPage;

  beforeEach(() => {
    page = new SulisartistsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
