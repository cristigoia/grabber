import React from 'react';
import { Meteor } from 'meteor/meteor';
import {ReactPageClick} from 'react-page-click';
import {
  removeBookmark,
  refreshBookmark,
  updateBookmark,
  incBookmarkViews
} from '../../api/bookmarks/methods';

export class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingActions: false,
      isModalOpen: false
    };

    this._handleActionsToggle   = this._handleActionsToggle.bind(this);
    this._handleRemoveAction    = this._handleRemoveAction.bind(this);
    this._handleBookmarkRefresh = this._handleBookmarkRefresh.bind(this);
    this._handleBookmarkEdit    = this._handleBookmarkEdit.bind(this);
    this._handeBookmarkClick    = this._handeBookmarkClick.bind(this);
  }

  /**
  * Helpers
  */
  _shortUrl() {
    return this.props.url.replace(/.*?:\/\//g,"").replace("www.","");
  }

  _thumbnail() {
    defaultImage = "http://www.mot.be/assets/images/blocks/placeholder_image_1.png";

    return (this.props.image === undefined || this.props.image === null || this.props.image === '') ? defaultImage : this.props.image;
  }

  /**
  * Renderers
  */
  _renderBookmarkActions() {
    const bookmarkActions = (
      <ul className="bookmark-actions">
        <li>
          <a onClick={this._handeBookmarkClick} href={this.props.url} target="_blank">
            <i className="fa fa-eye"></i> View
          </a>
        </li>
        <li>
          <a href="#!" onClick={this._handleBookmarkRefresh}><i className="fa fa-refresh"></i> Refresh</a>
        </li>
        <li>
          <a href="#!" onClick={this._handleBookmarkEdit}><i className="fa fa-pencil"></i> Edit</a>
        </li>
        <li>
          <a href="#!" onClick={this._handleRemoveAction} ><i className="fa fa-trash"></i> Remove</a>
        </li>
      </ul>
    );
    return bookmarkActions;
  }

  _renderBookmarkThumb() {
    const bookmarkThumb = (
      <a onClick={this._handeBookmarkClick} href={this.props.url} target="_blank" className="clickable-url">
        <img src={this._thumbnail()} alt="thumbnail" width="100%"/>
      </a>
    );
    return bookmarkThumb;
  }

  _renderThumbOrActions() {
    if(this.state.isShowingActions){
      return this._renderBookmarkActions();
    }
    else {
      return this._renderBookmarkThumb();
    }
  }

  /**
  * Handlers
  */
  _handleActionsToggle(e) {
    e.preventDefault();

    this.setState(prevState => ({
      isShowingActions: !prevState.isShowingActions
    }));
  }

  _handleRemoveAction(e) {
    e.preventDefault();

    removeBookmark.call({bookmarkId: this.props.id}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  }

  _handleBookmarkRefresh(e) {
    e.preventDefault();

    // Meteor.call("refreshBookmark", this.props.id);
    refreshBookmark.call({bookmarkId: this.props.id}, null);

    this.setState({isShowingActions: false});
  }

  _handleBookmarkEdit(e) {
    e.preventDefault();
    this.props.editBookmarkHandler(this.props.id);
  }

  _handeBookmarkClick(e) {
    incBookmarkViews.call({bookmarkId: this.props.id}, null);
  }

  render() {
    return (
      <div id={this.props.id} className="bookmark-card">
        <div className="inner">
          <h4>{this.props.title}</h4>
          <div className="bookmark-content">
          {this._renderThumbOrActions()}
          </div>
          <div className="bookmark-footer">
            <div className="bookmark-url-wrapper">
              <span className="bookmark-url">{this._shortUrl()}</span>
            </div>
            <span className="bookmark-actions-toggle" onClick={this._handleActionsToggle}>
              <i className={this.state.isShowingActions ? 'fa fa-undo' : 'fa fa-cog'}></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Bookmark.propTypes = {
  id:       React.PropTypes.string,
  title:    React.PropTypes.string,
  url:      React.PropTypes.string,
  image:    React.PropTypes.string,
  folderId: React.PropTypes.string,
  editBookmarkHandler: React.PropTypes.func
};
