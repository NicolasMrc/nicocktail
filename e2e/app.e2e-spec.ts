import { NicocktailPage } from './app.po';

describe('nicocktail App', () => {
  let page: NicocktailPage;

  beforeEach(() => {
    page = new NicocktailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
