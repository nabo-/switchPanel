/// <reference path="definitions/jquery.d.ts" />
var SwitchPanel;
(function (SwitchPanel) {
    var App = (function () {
        function App(switchTarget) {
            this.switchTarget = switchTarget;
            this.ready();
        }
        App.prototype.ready = function () {
            this.switchTarget.each(function () {
                var switchEvent = new SwitchEvent(this);
            });
        };
        return App;
    })();
    SwitchPanel.App = App;

    var SwitchEvent = (function () {
        function SwitchEvent(target) {
            this.target = target;
            this.prevButton = $('.js-switch__prev', this.target);
            this.nextButton = $('.js-switch__next', this.target);
            this.buttonStateChecker = new ButtonStateChecker(this.target);
            this.prev();
            this.next();
        }
        SwitchEvent.prototype.prev = function () {
            var _this = this;

            _this.prevButton.on('click', function (event) {
                event.preventDefault();
                if ($(this).hasClass('js-switch__prev_disable')) {
                    return;
                }
                var item = $('.js-show', _this.target);
                var prevItem = item.prev('.js-switch__item');
                var switcher = new Switcher(item, prevItem);
                switcher.run();

                _this.buttonStateChecker.prevButton();
            });
        };

        SwitchEvent.prototype.next = function () {
            var _this = this;

            _this.nextButton.on('click', function (event) {
                event.preventDefault();
                if ($(this).hasClass('js-switch__next_disable')) {
                    return;
                }
                var item = $('.js-show', _this.target);
                var nextItem = item.next('.js-switch__item');
                var switcher = new Switcher(item, nextItem);
                switcher.run();

                _this.buttonStateChecker.nextButton();
            });
        };
        return SwitchEvent;
    })();
    SwitchPanel.SwitchEvent = SwitchEvent;

    var ButtonStateChecker = (function () {
        function ButtonStateChecker(target) {
            this.target = target;
        }
        ButtonStateChecker.prototype.prevButton = function () {
            var item = $('.js-show', this.target);
            var checkItem = item.prev('.js-switch__item');
            $('.js-switch__next', this.target).removeClass('js-switch__next_disable');

            if (checkItem.length > 0) {
                return;
            }
            $('.js-switch__prev', this.target).addClass('js-switch__prev_disable');
        };

        ButtonStateChecker.prototype.nextButton = function () {
            var item = $('.js-show', this.target);
            var checkItem = item.next('.js-switch__item');
            $('.js-switch__prev', this.target).removeClass('js-switch__prev_disable');

            if (checkItem.length > 0) {
                return;
            }
            $('.js-switch__next', this.target).addClass('js-switch__next_disable');
        };
        return ButtonStateChecker;
    })();
    SwitchPanel.ButtonStateChecker = ButtonStateChecker;

    var Switcher = (function () {
        function Switcher(currentObj, switchObj) {
            this.currentObj = currentObj;
            this.switchObj = switchObj;
        }
        Switcher.prototype.run = function () {
            this.currentObj.removeClass('js-show').addClass('js-hide');
            this.switchObj.removeClass('js-hide').addClass('js-show');
        };
        return Switcher;
    })();
    SwitchPanel.Switcher = Switcher;
})(SwitchPanel || (SwitchPanel = {}));

(function () {
    var app = new SwitchPanel.App($('.js-switch'));
})();
