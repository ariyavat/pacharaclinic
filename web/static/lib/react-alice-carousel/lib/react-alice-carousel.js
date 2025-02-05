'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _views = require('./views');

var Views = _interopRequireWildcard(_views);

var _propTypes = require('./prop-types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AliceCarousel = function (_React$PureComponent) {
  _inherits(AliceCarousel, _React$PureComponent);

  function AliceCarousel(props) {
    _classCallCheck(this, AliceCarousel);

    var _this = _possibleConstructorReturn(this, (AliceCarousel.__proto__ || Object.getPrototypeOf(AliceCarousel)).call(this, props));

    _this._handleOnWindowResize = function (e) {
      var shouldHandleResizeEvent = _this.props.shouldHandleResizeEvent;

      var currentDimensions = Utils.getElementDimensions(_this.rootComponent);
      var shouldProcessEvent = shouldHandleResizeEvent || Utils.shouldHandleResizeEvent;

      if (shouldProcessEvent(e, _this.rootComponentDimensions, currentDimensions)) {
        _this.rootComponentDimensions = currentDimensions;
        _this._disableAnimation();
        _this._handleOnMouseEnter();

        var isAnimationCanceled = _this._isSwipeAnimationProcessing();
        var currState = Utils.calculateInitialProps(_this.props, _this.stageComponent);
        var translate3d = Utils.getTranslate3dPosition(currState.currentIndex, currState);
        var nextState = _extends({}, currState, { translate3d: translate3d, isAnimationCanceled: isAnimationCanceled, initialStageHeight: 0 });

        if (isAnimationCanceled) Utils.animate(_this.stageComponent, translate3d);

        _this.setState(nextState, function () {
          _this._resetAllIntermediateProps();
          _this._handleOnMouseLeave();
          _this._onResized();
        });
      }
    };

    _this._handleOnAnimationCanceled = function () {
      _this._resetAllIntermediateProps();
      _this.setState({ isAnimationCanceled: false });
    };

    _this._handleOnKeyUp = function (e) {
      switch (e.code) {
        case 'Space':
          return _this._handleOnSpaceBarClick();
        case 'ArrowLeft':
          return _this.slidePrev();
        case 'ArrowRight':
          return _this.slideNext();
      }
    };

    _this._handleOnSpaceBarClick = function () {
      _this.props.autoPlay && _this._playPauseToggle();
    };

    _this._handleOnMouseEnter = function () {
      if (_this.props.stopAutoPlayOnHover) {
        _this.isHovered = true;
      }
    };

    _this._handleOnMouseLeave = function () {
      _this.isHovered = false;
    };

    _this._onSlideToIndexChange = function (currentIndex, slideToIndex) {
      if (slideToIndex === currentIndex + 1) {
        _this.slideNext();
      } else if (slideToIndex === currentIndex - 1) {
        _this.slidePrev();
      } else {
        _this.slideTo(slideToIndex);
      }
    };

    _this._onInactiveItem = function () {
      _this._onSlideChange();
      _this._onSlideChanged();
      _this._allowAnimation();
      _this._pause();
    };

    _this._getFadeOutAnimationState = function (shouldRecalculate) {
      if (shouldRecalculate || _this._isFadeOutAnimationAllowed()) {
        return { fadeoutAnimationProcessing: false };
      }
      return {};
    };

    _this._setRootComponentRef = function (node) {
      return _this.rootComponent = node;
    };

    _this._setStageComponentRef = function (node) {
      return _this.stageComponent = node;
    };

    _this._allowAnimation = function () {
      return _this.allowAnimation = true;
    };

    _this._disableAnimation = function () {
      return _this.allowAnimation = false;
    };

    _this._skipSlidePositionRecalculation = function () {
      if (_this._isFadeOutAnimationAllowed()) {
        return _this._resetFadeOutAnimationState();
      }

      _this._onSlideChanged();
      _this.props.disableAutoPlayOnAction && _this._pause();
      _this.isHovered = false;
    };

    _this._updateSlidePosition = function () {
      _this._updateSlidePositionIntervalId = setTimeout(function () {
        if (_this._shouldRecalculatePosition()) {
          _this._recalculateSlidePosition();
        } else if (_this._isFadeOutAnimationAllowed()) {
          _this._resetFadeOutAnimationState();
        } else {
          _this._onSlideChanged();
        }
      }, _this.state.duration);
    };

    _this._resetFadeOutAnimationState = function () {
      _this.setState({ fadeoutAnimationProcessing: false }, _this._onSlideChanged);
    };

    _this._resetAllIntermediateProps = function () {
      _this.swipingStarted = false;
      _this.verticalSwipingDetected = false;

      _this._stopSwipeAnimation();
      _this._resetAnimationProps();
      _this._resetSwipePositionProps();
      _this._clearUpdateSlidePositionIntervalId();
      _this._resetTranslateAnimationProcessingFlag();
      _this._allowAnimation();
    };

    _this._recalculateSlidePosition = function () {
      var style = Utils.getDefaultStyles();
      var currentIndex = Utils.recalculateCurrentSlideIndex(_this.state);
      var translate3d = Utils.recalculateTranslatePosition(_this.state);

      _this.setState(_extends({
        currentIndex: currentIndex,
        translate3d: translate3d,
        style: style
      }, _this._getFadeOutAnimationState()), function () {
        return _this._onSlideChanged();
      });
    };

    _this._getEventObject = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state;
      var itemsInSlide = state.items,
          item = state.currentIndex;

      var _Utils$itemInfo = Utils.itemInfo(state),
          isNextSlideDisabled = _Utils$itemInfo.isNextSlideDisabled;

      var slide = Utils.getActiveSlideIndex(isNextSlideDisabled, state);

      return { item: item, slide: slide, itemsInSlide: itemsInSlide };
    };

    _this.setAnimationPropsOnDotClick = function (itemIndex) {
      var _this$state = _this.state,
          currentIndex = _this$state.currentIndex,
          itemWidth = _this$state.itemWidth;

      var fadeOutIndex = currentIndex + 1;
      var fadeOutOffset = Utils.getFadeOutOffsetOnDotClick(itemIndex, currentIndex, itemWidth);

      _this._setAnimationProps({ fadeOutIndex: fadeOutIndex, fadeOutOffset: fadeOutOffset, allowFadeOutAnimation: true });
    };

    _this._pause = function () {
      if (_this._autoPlayIntervalId) {
        _this._clearAutoPlayInterval();
        _this.setState({ isPlaying: false });
      }
    };

    _this._playPauseToggle = function () {
      if (!_this.allowAnimation) return;
      _this.state.isPlaying ? _this._pause() : _this._play();
    };

    _this._getIntermediateStateProps = function (duration, shouldSkipRecalculation) {
      var condition = !shouldSkipRecalculation && _this._isFadeOutAnimationAllowed();
      return Utils.getIntermediateTransitionProps(condition, duration);
    };

    _this._addTouchEventToCallstack = function () {
      _this.touchEventsCallstack.push(1);
    };

    _this._removeTouchEventFromCallstack = function () {
      _this.touchEventsCallstack.pop();
    };

    _this._setTranslateAnimationProcessingFlag = function () {
      _this.translateAnimationProcessing = true;
    };

    _this._resetTranslateAnimationProcessingFlag = function () {
      _this.translateAnimationProcessing = false;
    };

    _this._startSwipeAnimation = function () {
      _this.swipeAnimation = true;
    };

    _this._stopSwipeAnimation = function () {
      _this.swipeAnimation = false;
    };

    _this._setAnimationProps = function (newProps) {
      var prevProps = _this.animationProps || {};
      _this.animationProps = _extends({}, prevProps, newProps);
    };

    _this._resetAnimationProps = function () {
      _this.animationProps = {};
    };

    _this._setSwipePositionProps = function (newProps) {
      var prevProps = _this.swipePosition || {};
      _this.swipePosition = _extends({}, prevProps, newProps);
    };

    _this._resetSwipePositionProps = function () {
      _this.swipePosition = {};
    };

    _this._getTranslateXPosition = function (deltaX) {
      var translate3d = _this.state.translate3d;
      var _this$swipePosition$s = _this.swipePosition.startPosition,
          startPosition = _this$swipePosition$s === undefined ? translate3d : _this$swipePosition$s;


      if (!!_this.touchEventsCallstack.length && _this.translateAnimationProcessing) {
        _this._resetTranslateAnimationProcessingFlag();
        var lastTranslateXPosition = Utils.getTranslateX(_this.stageComponent);

        if (lastTranslateXPosition) {
          return lastTranslateXPosition - deltaX;
        }
      }
      return startPosition - deltaX;
    };

    _this._onTouchEnd = function () {
      _this.swipingStarted = false;

      if (_this._isSwipeDisable()) {
        return;
      }

      _this._addTouchEventToCallstack();
      _this._setSwipePositionProps({ startPosition: _this.swipePosition.position });
      _this._beforeTouchEnd();
    };

    _this._isHovered = function () {
      return _this.isHovered;
    };

    _this._isClickDisabled = function (itemIndex) {
      var _this$state2 = _this.state,
          currentIndex = _this$state2.currentIndex,
          isAnimationCanceled = _this$state2.isAnimationCanceled;

      return currentIndex === itemIndex || isAnimationCanceled || !_this.allowAnimation || _this.swipeAnimation;
    };

    _this._isFadeOutAnimationAllowed = function () {
      var _this$state3 = _this.state,
          stagePadding = _this$state3.stagePadding,
          items = _this$state3.items;

      var hasNoStagePadding = !(stagePadding.paddingLeft || stagePadding.paddingRight);

      return _this.props.fadeOutAnimation && items === 1 && hasNoStagePadding;
    };

    _this._isSwipeDisable = function () {
      var _this$state4 = _this.state,
          isAnimationCanceled = _this$state4.isAnimationCanceled,
          fadeOutAnimation = _this$state4.fadeOutAnimation;

      return _this.props.swipeDisabled || fadeOutAnimation || isAnimationCanceled || _this.verticalSwipingDetected;
    };

    _this._isSwipeAnimationLastFrame = function () {
      return !_this.swipingStarted && _this.touchEventsCallstack.length === 0;
    };

    _this._isSwipeAnimationProcessing = function () {
      return !!_this.touchEventsCallstack.length;
    };

    _this._shouldRecalculatePosition = function () {
      var _this$state5 = _this.state,
          slides = _this$state5.slides,
          currentIndex = _this$state5.currentIndex;

      return currentIndex < 0 || currentIndex >= slides.length;
    };

    _this._setAnimationPropsOnClick = function (direction) {
      var _this$state6 = _this.state,
          currentIndex = _this$state6.currentIndex,
          itemWidth = _this$state6.itemWidth;

      var fadeOutIndex = Utils.getFadeOutIndexOnClick(currentIndex);
      var fadeOutOffset = Utils.getFadeOutOffsetOnClick(direction, itemWidth);

      _this._setAnimationProps({ fadeOutIndex: fadeOutIndex, fadeOutOffset: fadeOutOffset, allowFadeOutAnimation: true });
    };

    _this._renderSlideInfo = function () {
      var _this$state7 = _this.state,
          currentIndex = _this$state7.currentIndex,
          slides = _this$state7.slides;

      return _react2.default.createElement(Views.SlideInfo, { slidesLength: slides.length, currentIndex: currentIndex });
    };

    _this._renderStageItem = function (item, i) {
      var style = Utils.itemStyles(i, _this.state, _this.animationProps);
      var className = Utils.itemClassName(i, _this.state, _this.animationProps);
      return _react2.default.createElement(Views.StageItem, { styles: style, className: className, key: 'stage-item-' + i, item: item });
    };

    _this.state = {
      clones: [],
      stagePadding: {},
      currentIndex: 1,
      initialStageHeight: 0,
      duration: props.duration,
      slides: Utils.getSlides(props),
      style: Utils.getDefaultStyles()
    };

    _this.touchEventsCallstack = [];
    _this.slideTo = _this.slideTo.bind(_this);
    _this.slidePrev = _this.slidePrev.bind(_this);
    _this.slideNext = _this.slideNext.bind(_this);
    _this._onTouchMove = _this._onTouchMove.bind(_this);
    _this._debouncedHandleOnWindowResize = Utils.debounce(_this._handleOnWindowResize, 100);
    return _this;
  }

  _createClass(AliceCarousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setInitialState();
      this._resetAllIntermediateProps();
      this.rootComponentDimensions = Utils.getElementDimensions(this.rootComponent);

      window.addEventListener('resize', this._debouncedHandleOnWindowResize);

      if (!this.props.keysControlDisabled) {
        window.addEventListener('keyup', this._handleOnKeyUp);
      }

      this.props.autoPlay && this._play();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.autoHeight && this.stageComponent && !this.state.initialStageHeight) {
        var initialStageHeight = Utils.getGalleryItemHeight(this.stageComponent, this.props, this.state);
        this.setState({ initialStageHeight: initialStageHeight });
      }

      if (this.props.duration !== prevProps.duration) {
        this.setState({ duration: this.props.duration });
      }

      if (this.props.fadeOutAnimation !== prevProps.fadeOutAnimation) {
        this.setState({ fadeoutAnimationProcessing: false }, this._resetAnimationProps);
      }

      if (this.props.slideToIndex !== prevProps.slideToIndex) {
        this._onSlideToIndexChange(this.state.currentIndex, this.props.slideToIndex);
      }

      if (this.props.disableAutoPlayOnAction !== prevProps.disableAutoPlayOnAction || this.props.autoPlayDirection !== prevProps.autoPlayDirection || this.props.autoPlayInterval !== prevProps.autoPlayInterval || this.props.infinite !== prevProps.infinite || this.props.autoPlay !== prevProps.autoPlay) {
        this.props.autoPlay ? this._play() : this._pause();
      }

      if (this.props.stagePadding !== prevProps.stagePadding || this.props.responsive !== prevProps.responsive || this.props.infinite !== prevProps.infinite || this.props.items !== prevProps.items) {
        this._resetAllIntermediateProps();
        this.setState(Utils.calculateInitialProps(this.props, this.stageComponent));
      }

      if (this.props.keysControlDisabled !== prevProps.keysControlDisabled) {
        this.props.keysControlDisabled ? window.removeEventListener('keyup', this._handleOnKeyUp) : window.addEventListener('keyup', this._handleOnKeyUp);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._debouncedHandleOnWindowResize);

      if (!this.props.keysControlDisabled) {
        window.removeEventListener('keyup', this._handleOnKeyUp);
      }

      if (this._autoPlayIntervalId) {
        clearInterval(this._autoPlayIntervalId);
        this._autoPlayIntervalId = null;
      }
    }
  }, {
    key: 'slideTo',
    value: function slideTo() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this._isClickDisabled(index)) return;

      this._disableAnimation();
      this._isFadeOutAnimationAllowed() && this.setAnimationPropsOnDotClick(index);
      this.props.disableAutoPlayOnAction && this._pause();
      this._slideToItem(index);
    }
  }, {
    key: 'slidePrev',
    value: function slidePrev() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this._isClickDisabled()) return;

      this._disableAnimation();
      this._isFadeOutAnimationAllowed() && this._setAnimationPropsOnClick('prev');

      if (Utils.itemInfo(this.state).isPrevSlideDisabled) return this._onInactiveItem();
      if (action && this.props.disableAutoPlayOnAction) this._pause();

      this._slideToItem(this.state.currentIndex - 1);
    }
  }, {
    key: 'slideNext',
    value: function slideNext() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this._isClickDisabled()) return;

      this._disableAnimation();
      this._isFadeOutAnimationAllowed() && this._setAnimationPropsOnClick('next');

      if (Utils.itemInfo(this.state).isNextSlideDisabled) return this._onInactiveItem();
      if (action && this.props.disableAutoPlayOnAction) this._pause();

      this._slideToItem(this.state.currentIndex + 1);
    }
  }, {
    key: '_onSlideChange',
    value: function _onSlideChange() {
      if (this.props.onSlideChange) {
        this.props.onSlideChange(this._getEventObject());
      }
    }
  }, {
    key: '_onSlideChanged',
    value: function _onSlideChanged() {
      if (this.props.onSlideChanged) {
        this.props.onSlideChanged(this._getEventObject());
      }
      this._allowAnimation();
    }
  }, {
    key: '_onInitialized',
    value: function _onInitialized(initialState) {
      if (this.props.onInitialized) {
        this.props.onInitialized(this._getEventObject(initialState));
      }
    }
  }, {
    key: '_onResized',
    value: function _onResized() {
      if (this.props.onResized) {
        this.props.onResized(this._getEventObject());
      }
    }
  }, {
    key: '_setInitialState',
    value: function _setInitialState() {
      var initialState = Utils.calculateInitialProps(this.props, this.stageComponent);
      this.setState(initialState, this._onInitialized(initialState));
    }
  }, {
    key: '_checkSlidePosition',
    value: function _checkSlidePosition(shouldSkipRecalculation) {
      this._stopSwipeAnimation();
      this._resetAnimationProps();
      this._resetSwipePositionProps();

      shouldSkipRecalculation ? this._skipSlidePositionRecalculation() : this._updateSlidePosition();
    }
  }, {
    key: '_setAutoPlayInterval',
    value: function _setAutoPlayInterval() {
      var _this2 = this;

      var duration = this.state.duration;
      var _props = this.props,
          autoPlayDirection = _props.autoPlayDirection,
          autoPlayInterval = _props.autoPlayInterval;

      var playInterval = Math.max(autoPlayInterval, duration);

      this._autoPlayIntervalId = setInterval(function () {
        if (!_this2._isHovered() && _this2._autoPlayIntervalId && _this2.state.isPlaying) {
          autoPlayDirection === 'rtl' ? _this2.slidePrev(false) : _this2.slideNext(false);
        }
      }, playInterval);
    }
  }, {
    key: '_clearAutoPlayInterval',
    value: function _clearAutoPlayInterval() {
      clearInterval(this._autoPlayIntervalId);
      this._autoPlayIntervalId = null;
    }
  }, {
    key: '_clearUpdateSlidePositionIntervalId',
    value: function _clearUpdateSlidePositionIntervalId() {
      clearInterval(this._updateSlidePositionIntervalId);
    }
  }, {
    key: '_play',
    value: function _play() {
      this.setState({ isPlaying: true });
      if (!this._autoPlayIntervalId) {
        this._setAutoPlayInterval();
      }
    }
  }, {
    key: '_slideToItem',
    value: function _slideToItem(index) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._onSlideChange();
      var _options$duration = options.duration,
          duration = _options$duration === undefined ? this.state.duration : _options$duration,
          _options$shouldSkipRe = options.shouldSkipRecalculation,
          shouldSkipRecalculation = _options$shouldSkipRe === undefined ? false : _options$shouldSkipRe;

      var translate3d = Utils.getTranslate3dPosition(index, this.state);

      this.setState(_extends({
        currentIndex: index,
        translate3d: translate3d
      }, this._getIntermediateStateProps(duration, shouldSkipRecalculation)), function () {
        return _this3._checkSlidePosition(shouldSkipRecalculation);
      });
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(e, deltaX, deltaY) {
      this.swipingStarted = true;
      this._handleOnMouseEnter();

      if (Utils.isVerticalTouchMoveDetected(e, deltaX, deltaY)) {
        this.verticalSwipingDetected = true;
        return;
      } else {
        this.verticalSwipingDetected = false;
      }

      if (this._isSwipeDisable()) {
        return;
      }

      this._disableAnimation();
      this._startSwipeAnimation();
      this._clearUpdateSlidePositionIntervalId();

      var _state = this.state,
          slides = _state.slides,
          items = _state.items,
          itemWidth = _state.itemWidth,
          infinite = _state.infinite,
          stagePadding = _state.stagePadding;

      var slidesLength = slides.length;
      var direction = Utils.getSwipeDirection(deltaX);
      var position = this._getTranslateXPosition(deltaX);

      if (infinite === false) {
        var _minSwipeLimit = Utils.getMinSwipeLimitIfNotInfinite(items, itemWidth);
        var _maxSwipeLimit = Utils.getMaxSwipeLimitIfNotInfinite(slidesLength, itemWidth);

        if (Utils.shouldRecalculateSwipePosition(position, _minSwipeLimit, _maxSwipeLimit)) {
          return;
        }

        Utils.animate(this.stageComponent, position);
        this._setSwipePositionProps({ position: position, direction: direction });
        return;
      }

      var maxPosition = Utils.getMaxSwipePosition(items, itemWidth, slidesLength);
      var minPosition = Utils.getMinSwipePosition(items, itemWidth);
      var maxSwipeLimit = Utils.getMaxSwipeLimit(maxPosition, stagePadding);
      var minSwipeLimit = Utils.getMinSwipeLimit(minPosition, stagePadding);

      if (Utils.shouldRecalculateSwipePosition(position, minSwipeLimit, maxSwipeLimit)) {
        try {
          recalculatePosition();
        } catch (err) {
          Utils.debug(err);
        }
      }

      Utils.animate(this.stageComponent, position);
      this._setSwipePositionProps({ position: position, direction: direction });

      function recalculatePosition() {
        direction === 'RIGHT' ? position = position + slidesLength * -itemWidth : position = position + maxPosition - items * itemWidth;

        if (Utils.shouldRecalculateSwipePosition(position, minSwipeLimit, maxSwipeLimit)) {
          recalculatePosition();
        }
      }
    }
  }, {
    key: '_beforeTouchEnd',
    value: function _beforeTouchEnd() {
      var _this4 = this;

      var _swipePosition = this.swipePosition,
          direction = _swipePosition.direction,
          position = _swipePosition.position;
      var _state2 = this.state,
          itemWidth = _state2.itemWidth,
          items = _state2.items,
          duration = _state2.duration,
          infinite = _state2.infinite;

      var swipeIndex = Utils.calculateSwipeIndex(itemWidth, position, direction);
      var currentIndex = Utils.getSwipeIndexOnBeforeTouchEnd(swipeIndex, items);
      var translateXPosition = Utils.getSwipePositionOnBeforeTouchEnd(swipeIndex, itemWidth);

      if (infinite === false) {
        this._isInfiniteModeDisabledBeforeTouchEnd(swipeIndex, currentIndex);
        return;
      }

      this._setTranslateAnimationProcessingFlag();
      Utils.animate(this.stageComponent, translateXPosition, duration);

      setTimeout(function () {
        _this4._removeTouchEventFromCallstack();
        _this4._resetTranslateAnimationProcessingFlag();

        if (_this4._isSwipeAnimationLastFrame()) {
          if (_this4.state.isAnimationCanceled) {
            return _this4._handleOnAnimationCanceled();
          }

          var nextItemIndex = Utils.getNextItemIndexBeforeTouchEnd(translateXPosition, _this4.state);
          var nextTranslateXPosition = Utils.getTranslate3dPosition(nextItemIndex, _this4.state);

          Utils.animate(_this4.stageComponent, nextTranslateXPosition, 0);
          _this4._slideToItem(nextItemIndex, { duration: 0, shouldSkipRecalculation: true });
        }
      }, duration);
    }
  }, {
    key: '_isInfiniteModeDisabledBeforeTouchEnd',
    value: function _isInfiniteModeDisabledBeforeTouchEnd(swipeIndex, currentIndex) {
      var _this5 = this;

      var _state3 = this.state,
          items = _state3.items,
          itemWidth = _state3.itemWidth,
          duration = _state3.duration,
          slides = _state3.slides;

      var position = Utils.getTranslate3dPosition(currentIndex, { itemWidth: itemWidth, items: items });

      if (swipeIndex < items) {
        currentIndex = Utils.recalculateCurrentIndexOnBeforeTouchEnd();
        position = Utils.recalculatePositionOnBeforeTouchEnd(items, itemWidth);
      }

      if (swipeIndex > slides.length) {
        currentIndex = Utils.recalculateCurrentIndexOnBeforeTouchEnd(slides.length, items);
        position = Utils.recalculatePositionOnBeforeTouchEnd(slides.length, itemWidth);
      }

      Utils.animate(this.stageComponent, position, duration);
      this._setTranslateAnimationProcessingFlag();

      setTimeout(function () {
        _this5._removeTouchEventFromCallstack();
        _this5._resetTranslateAnimationProcessingFlag();

        if (_this5._isSwipeAnimationLastFrame()) {
          if (_this5.state.isAnimationCanceled) {
            return _this5._handleOnAnimationCanceled();
          }

          Utils.animate(_this5.stageComponent, position);
          _this5._slideToItem(currentIndex, { duration: 0, shouldSkipRecalculation: true });
        }
      }, duration);
    }
  }, {
    key: '_renderPrevButton',
    value: function _renderPrevButton() {
      var _Utils$itemInfo2 = Utils.itemInfo(this.state),
          isPrevSlideDisabled = _Utils$itemInfo2.isPrevSlideDisabled;

      return _react2.default.createElement(Views.PrevNextButton, {
        name: 'prev',
        disabled: isPrevSlideDisabled,
        onClick: this.slidePrev,
        onMouseEnter: this._handleOnMouseEnter,
        onMouseLeave: this._handleOnMouseLeave
      });
    }
  }, {
    key: '_renderNextButton',
    value: function _renderNextButton() {
      var _Utils$itemInfo3 = Utils.itemInfo(this.state),
          isNextSlideDisabled = _Utils$itemInfo3.isNextSlideDisabled;

      return _react2.default.createElement(Views.PrevNextButton, {
        name: 'next',
        disabled: isNextSlideDisabled,
        onClick: this.slideNext,
        onMouseEnter: this._handleOnMouseEnter,
        onMouseLeave: this._handleOnMouseLeave
      });
    }
  }, {
    key: '_renderPlayPauseButton',
    value: function _renderPlayPauseButton() {
      return _react2.default.createElement(Views.PlayPauseButton, { isPlaying: this.state.isPlaying, onClick: this._playPauseToggle });
    }
  }, {
    key: '_renderDotsNavigation',
    value: function _renderDotsNavigation() {
      return _react2.default.createElement(Views.DotsNavigation, {
        state: this.state,
        onClick: this.slideTo,
        onMouseEnter: this._handleOnMouseEnter,
        onMouseLeave: this._handleOnMouseLeave
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state,
          style = _state4.style,
          translate3d = _state4.translate3d,
          clones = _state4.clones;

      var wrapperStyles = Utils.getWrapperStyles(this.stageComponent, this.props, this.state);
      var stageStyles = Utils.getStageStyles({ translate3d: translate3d }, style);

      return _react2.default.createElement(
        'div',
        { className: 'alice-carousel', ref: this._setRootComponentRef },
        _react2.default.createElement(
          _reactSwipeable2.default,
          {
            rotationAngle: 3,
            stopPropagation: true,
            onSwiping: this._onTouchMove,
            onSwiped: this._onTouchEnd,
            trackMouse: this.props.mouseDragEnabled,
            preventDefaultTouchmoveEvent: this.props.preventEventOnTouchMove
          },
          _react2.default.createElement(
            'div',
            {
              style: wrapperStyles,
              className: 'alice-carousel__wrapper',
              onMouseEnter: this._handleOnMouseEnter,
              onMouseLeave: this._handleOnMouseLeave
            },
            _react2.default.createElement(
              'ul',
              { style: stageStyles, className: 'alice-carousel__stage', ref: this._setStageComponentRef },
              clones.map(this._renderStageItem)
            )
          )
        ),
        this.props.showSlideInfo ? this._renderSlideInfo() : null,
        !this.props.dotsDisabled ? this._renderDotsNavigation() : null,
        !this.props.buttonsDisabled ? this._renderPrevButton() : null,
        !this.props.buttonsDisabled ? this._renderNextButton() : null,
        this.props.playButtonEnabled ? this._renderPlayPauseButton() : null
      );
    }
  }]);

  return AliceCarousel;
}(_react2.default.PureComponent);

exports.default = AliceCarousel;


AliceCarousel.propTypes = _propTypes.propTypes;
AliceCarousel.defaultProps = _propTypes.defaultProps;