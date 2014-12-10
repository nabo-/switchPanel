/// <reference path="definitions/jquery.d.ts" />
module SwitchPanel {

	export class App {
		constructor(public switchTarget:JQuery){
			this.ready();
		}
		ready():void {
			this.switchTarget.each(function(){
				var switchEvent = new SwitchEvent(this);
			});
		}
	}

	export class SwitchEvent {
		private prevButton: JQuery;
		private nextButton: JQuery;
		private buttonStateChecker: ButtonStateChecker;

		constructor(public target:JQuery){
			this.prevButton = $('.js-switch__prev', this.target);
			this.nextButton = $('.js-switch__next', this.target);
			this.buttonStateChecker = new ButtonStateChecker(this.target);
			this.prev();
			this.next();
		}

		prev():void {
			var _this = this;

			_this.prevButton.on('click', function(event){
				event.preventDefault();
				if($(this).hasClass('js-switch__prev_disable')){
					return;
				}
				var item:JQuery = $('.js-show', _this.target);
				var prevItem:JQuery = item.prev('.js-switch__item');
				var switcher: Switcher = new Switcher(item, prevItem);
				switcher.run();

				_this.buttonStateChecker.prevButton();
			});
		}

		next():void {
			var _this = this;

			_this.nextButton.on('click', function(event){
				event.preventDefault();
				if($(this).hasClass('js-switch__next_disable')){
					return;
				}
				var item:JQuery = $('.js-show', _this.target);
				var nextItem:JQuery = item.next('.js-switch__item');
				var switcher: Switcher = new Switcher(item, nextItem);
				switcher.run();

				_this.buttonStateChecker.nextButton();
			});
		}
	}

	export class ButtonStateChecker {
		constructor(public target:JQuery){
		}

		prevButton():void {
			var item = $('.js-show', this.target);
			var checkItem = item.prev('.js-switch__item');
			$('.js-switch__next', this.target).removeClass('js-switch__next_disable');

			if(checkItem.length > 0){
				return;
			}
			$('.js-switch__prev', this.target).addClass('js-switch__prev_disable');
		}

		nextButton():void {
			var item = $('.js-show', this.target);
			var checkItem = item.next('.js-switch__item');
			$('.js-switch__prev', this.target).removeClass('js-switch__prev_disable');

			if(checkItem.length > 0){
				return;
			}
			$('.js-switch__next', this.target).addClass('js-switch__next_disable');
		}
	}

	export class Switcher {
		constructor(
			public currentObj:JQuery,
			public switchObj:JQuery
		){}

		run():void {
			this.currentObj.removeClass('js-show').addClass('js-hide');
			this.switchObj.removeClass('js-hide').addClass('js-show');
		}
	}
}

(function(){
	var app = new SwitchPanel.App($('.js-switch'));
})();