import React from 'react'
import { GrEmoji } from 'react-icons/gr'

const Comment = ({comment, handleComment, handlePostComment}) => {
  return (
    <div>
        <input value={comment} className='comment' type="text" onChange={(e)=>handleComment(e)} placeholder='Add a comment...'/>
        {comment ? <label onClick={handlePostComment} style={{marginRight: '6px', fontWeight: '600', fontSize: '14px', color: '#0095f6', cursor: 'pointer'}}>Post</label> : <label style={{marginRight: '6px', fontWeight: '600', fontSize: '14px', color: '#ffffff'}}>Post</label>}
        <GrEmoji />
    </div>
  )
}

export default Comment