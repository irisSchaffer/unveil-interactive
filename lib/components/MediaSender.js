'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rxjs = require('rxjs');

var _lib = require('unveil-network-sync/lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'MediaSender',

  componentWillMount: function componentWillMount() {
    this.subject = new _rxjs.Subject();
  },

  componentDidMount: function componentDidMount() {
    subject.subscribe(function (content) {
      _lib2.default.emit('state/slide:add', content);
    });
  },

  share: function share() {
    this.subject.next(this.refs.textarea.value);
  },

  toggleSharingMode: function toggleSharingMode(event) {
    this.setState({ sharingMode: true });
  },

  render: function render() {
    if (!this.state.sharingMode) return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'button',
        { onClick: '{this.toggleSharingMode}' },
        'Share'
      )
    );else return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('textarea', { ref: 'textarea' }),
      _react2.default.createElement(
        'button',
        { onClick: '{this.share}' },
        'Share'
      ),
      _react2.default.createElement(
        'button',
        { onClick: '{this.toggleSharingMode}' },
        'Close'
      )
    );
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL01lZGlhU2VuZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFNZSxnQkFBTSxXQUFOLENBQWtCOzs7QUFDL0Isc0JBQW9CLDhCQUFXO0FBQzdCLFNBQUssT0FBTCxHQUFlLG1CQUFmLENBRDZCO0dBQVg7O0FBSXBCLHFCQUFtQiw2QkFBWTtBQUM3QixZQUNHLFNBREgsQ0FDYSxVQUFDLE9BQUQsRUFBYTtBQUN0QixvQkFBTyxJQUFQLENBQVksaUJBQVosRUFBK0IsT0FBL0IsRUFEc0I7S0FBYixDQURiLENBRDZCO0dBQVo7O0FBT25CLFNBQU8saUJBQVk7QUFDakIsU0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLEtBQW5CLENBQWxCLENBRGlCO0dBQVo7O0FBSVAscUJBQW1CLDJCQUFVLEtBQVYsRUFBaUI7QUFDbEMsU0FBSyxRQUFMLENBQWMsRUFBQyxhQUFhLElBQWIsRUFBZixFQURrQztHQUFqQjs7QUFJbkIsVUFBUSxrQkFBWTtBQUNsQixRQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsV0FBWCxFQUF3QixPQUMzQjs7O01BQUs7O1VBQVEsU0FBUSwwQkFBUixFQUFSOztPQUFMO0tBRDJCLENBQTdCLEtBR0ssT0FDSDs7O01BQ0UsNENBQVUsS0FBSSxVQUFKLEVBQVYsQ0FERjtNQUVFOztVQUFRLFNBQVEsY0FBUixFQUFSOztPQUZGO01BR0U7O1VBQVEsU0FBUSwwQkFBUixFQUFSOztPQUhGO0tBREcsQ0FITDtHQURNOztDQXBCSyIsImZpbGUiOiJNZWRpYVNlbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHNvY2tldCBmcm9tICd1bnZlaWwtbmV0d29yay1zeW5jL2xpYic7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgc3ViamVjdFxuICAgICAgLnN1YnNjcmliZSgoY29udGVudCkgPT4ge1xuICAgICAgICBzb2NrZXQuZW1pdCgnc3RhdGUvc2xpZGU6YWRkJywgY29udGVudCk7XG4gICAgICB9KTtcbiAgfSxcblxuICBzaGFyZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3ViamVjdC5uZXh0KHRoaXMucmVmcy50ZXh0YXJlYS52YWx1ZSk7XG4gIH0sXG5cbiAgdG9nZ2xlU2hhcmluZ01vZGU6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NoYXJpbmdNb2RlOiB0cnVlfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnNoYXJpbmdNb2RlKSByZXR1cm4gKFxuICAgICAgPGRpdj48YnV0dG9uIG9uQ2xpY2s9XCJ7dGhpcy50b2dnbGVTaGFyaW5nTW9kZX1cIj5TaGFyZTwvYnV0dG9uPjwvZGl2PlxuICAgICk7XG4gICAgZWxzZSByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHRleHRhcmVhIHJlZj1cInRleHRhcmVhXCIgLz5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPVwie3RoaXMuc2hhcmV9XCI+U2hhcmU8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPVwie3RoaXMudG9nZ2xlU2hhcmluZ01vZGV9XCI+Q2xvc2U8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufSk7Il19