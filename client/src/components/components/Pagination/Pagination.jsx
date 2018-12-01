import React, { Component } from "react";
import "./Pagination.scss";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        pageNumber: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.nextIsValid = this.nextIsValid.bind(this);
    this.prevIsValid = this.prevIsValid.bind(this);
  }

  handleInputChange(e) {
    var newPageNum = e.target.value;
    if (newPageNum < 0) {
        newPageNum = 0
    }
    else if (newPageNum > this.props.maxPages) {
        newPageNum = this.props.maxPages
    }
    this.setState({pageNumber: newPageNum})
  }

  goToNextPage() {
    if (this.nextIsValid()) {
      this.props.setPageNumber(this.state.pageNumber + 1);
      this.setState({
        pageNumber: this.state.pageNumber + 1
      });
    }
  }

  goToPrevPage() {
    if (this.prevIsValid()) {
        this.props.setPageNumber(this.state.pageNumber - 1);
      this.setState({
        pageNumber: this.state.pageNumber - 1
      });
    }
  }

  nextIsValid() {
    return this.state.pageNumber < this.props.maxPages;
  }

  prevIsValid() {
    return this.state.pageNumber > 0;
  }

  render() {
    var prevIsDisabled = !this.prevIsValid();
    var nextIsDisabled = !this.nextIsValid();

    return (
      <div className="pagination-wrapper">
        <button
            className={`pagination-btn ${prevIsDisabled ? 'btn-disabled' : ''}`}
            onClick={this.goToPrevPage}
            disabled={prevIsDisabled}>
          {'< Prev'}
        </button>
        <input value={this.state.pageNumber} onChange={this.handleInputChange}/>
        <button
            className={`pagination-btn ${nextIsDisabled ? 'btn-disabled' : ''}`}
            onClick={this.goToNextPage}
            disabled={nextIsDisabled}>
          {'Next >'}
        </button>
      </div>
    );
  }
}

export default Pagination;
