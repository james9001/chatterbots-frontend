import { AppPage } from "./app.po";

describe("new App", () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it("should be blank", () => {
		void page.navigateTo();
		void expect(page.getParagraphText()).toContain("Start with Ionic UI Components");
	});
});
