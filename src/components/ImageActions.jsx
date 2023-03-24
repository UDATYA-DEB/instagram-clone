import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { TbMessageCircle2 } from 'react-icons/tb'
import { RiBookmarkLine } from 'react-icons/ri'
import { FiSend } from 'react-icons/fi'
import { AiFillHeart } from 'react-icons/ai'

const ImageActions = ({isLiked, like, handleLike}) => {
  console.log(isLiked)
  return (
    <div>
        <div style={{margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '25px'}}>
            <div style={{display: 'flex', alignItems: 'center', width: '110px', justifyContent: 'space-between'}}>
                {isLiked ? <AiFillHeart color='red' size={27} style={{cursor: 'pointer'}} onClick={handleLike} /> : <AiOutlineHeart size={27} style={{cursor: 'pointer'}} onClick={handleLike} />}
                <TbMessageCircle2 style={{WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)', cursor: 'pointer'}} size={27}/>
                <FiSend size={27} style={{cursor: 'pointer'}}/>
            </div>
            <RiBookmarkLine size={27} style={{cursor: 'pointer'}}/>
        </div>
        {/* {like === 0 && <p style={{padding: '0', marginTop: '5px', fontWeight: '600', color: 'white'}}>{like} like</p>} */}
        {like === 1 && <p style={{padding: '0', marginTop: '5px', fontWeight: '600'}}>{like} like</p>}
        {like > 1 && <p style={{padding: '0', marginTop: '5px', fontWeight: '600'}}>{like} likes</p>}
    </div>
  )
}

export default ImageActions