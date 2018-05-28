import { createMuiTheme } from '@material-ui/core/styles';

export class SideDrawer {
	private selector: string = "app-nav-content";
	private scrollClass: string = "app-nav-scroll-hidden-on-mobile";
	public toggle() {
		const el: Element = document.getElementsByClassName(this.selector)[0];
		if(el.classList.contains('active'))
			this.hide();
		else 
			this.show();
	}
	public hide() {
		const el: Element = document.getElementsByClassName(this.selector)[0];
		el.classList.remove('active');
		document.body.classList.remove(this.scrollClass)
	}
	public show() {
		const el: Element = document.getElementsByClassName(this.selector)[0];
		el.classList.add('active');
		document.body.classList.add(this.scrollClass)
	}

	public hideOnMobile() {
		if(window.innerWidth < createMuiTheme().breakpoints.values.sm)
			this.hide();
	}
}