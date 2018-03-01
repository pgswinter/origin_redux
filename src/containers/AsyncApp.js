import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../redux/actions'

import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount(){
    const {dispatch, selectedSubreddit} = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
    console.log(this.props)
  }

  // componentDidUpdate được gọi ngay lập tức sau khi updatingt xảy ra.
  // Phương thức này không được gọi khi bắt đầu render

  // Sử dụng componentDidUpdate như một cơ hội để hoạt động trong DOM
  // khi component được updated.
  // Đây cũng là một thời điểm tốt để làm việc với các yêu cầu network
  // miễn là bạn so sánh props hiện tại và props trước đó
  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const {dispatch, selectedSubreddit} = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit){
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e){
    e.preventDefault()

    const {dispatch, selectedSubreddit} = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render(){
    // Đây là ES6
    // const selectedSubreddit, posts, isFetching, lastUpdated} = this.props
    // Viết kiểu ES5 - browser sẽ render ra cái này
    const selectedSubreddit = this.props.selectedSubreddit
    const lastUpdated = this.props.lastUpdated
    const isFetching = this.props.isFetching
    const posts = this.props.posts
    console.log(lastUpdated)
    console.log(isFetching)
    console.log(posts)
    return (
      <div className="">
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs','frontend']}
        />

        <p>
          {lastUpdated && 
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {
            !isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {
          posts.length > 0 &&
          <div style={{opacity: isFetching ? 0.5 : 1}}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  // const selectedSubreddit = state.selectedSubreddit
  // const postsBySubreddit = state.postsBySubreddit
  // Hoặc viết theo kiểu ES6
  const { selectedSubreddit, postsBySubreddit } = state

  // es5
  var _ref = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  }
  console.log(_ref)
  var isFetching = _ref.isFetching,
      lastUpdated = _ref.lastUpdated,
      posts = _ref.items
  console.log(posts)
  // es6
  // const {
  //   isFetching,
  //   lastUpdated,
  //   items: posts
  // } = postsBySubreddit[selectedSubreddit] || {
  //   isFetching: true,
  //   items: []
  // }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }

}
 
// export default AsyncApp
export default connect(mapStateToProps)(AsyncApp)