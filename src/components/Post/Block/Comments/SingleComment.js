import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {Link } from 'react-router-dom'
import * as Style from '../../Styles'
import { Avatar } from '../../../Avatar'
import db from '../../../../config/Firebase'
import firebase from 'firebase'
import { useAuth } from '../../../Context'
import { v4 as uuidv4 } from 'uuid';
import Typography from '../../../Typography'
import ReplyInput from './CreateComment';
import { Flex } from '../../../Styles/Styles'
import Icon from '../../../Icons'
export default function SingleComment(props) {
    const { currentUser } = useAuth()
    const [commentUser, setCommentuser]= useState(null)
    const [showReply, setShowReply] = useState(false)
    const [replies, setReplies]= useState([])
    const [reply, setReply]= useState({ value:'', reply_to:{id:'',  displayName: ''}})
    const [limitMap, setLimitMap]=useState({value: 2, limited: true})
    const expandComments = e =>{
        e.preventDefault()
        setLimitMap({value: replies.length, limited: false})
    }
    const narrowComments =e=>{
        e.preventDefault()
        setLimitMap({value: 2, limited:true})
    }
    const handleShowInput = e =>{
        e.preventDefault()
        setShowReply((showReply)=> !showReply)
        setReply({value: '', reply_to:{id: '',  displayName: ''}})
    }
    useEffect(()=>{
        const fetchCommentUser = db.collection('users').doc(props.user).onSnapshot((doc)=>{
            setCommentuser(doc.data())
        })
        return ()=> { fetchCommentUser()} 

    }, [props.user, props.comment])
    
    useEffect(()=>{
        if(!commentUser) return 
        const unsubscribe = setReply({ reply_to:{id: commentUser.uid,  displayName: commentUser.displayName}})
        
        return ()=> unsubscribe
        
    }, [commentUser])
    
    const handleReplyChange=(e)=>{
        setReply({value: e.target.value,  reply_to:{id: commentUser?.uid,  displayName: commentUser?.displayName}})
        console.log(reply)
    }
    const handleReply= (e)=>{
        e.preventDefault()
        console.log('clicked')
        if(reply.value === '') return;
        const replyId =  uuidv4()
        db.collection('posts').doc(props.postId)
        .collection('comments').doc(props.commentId)
        .collection('replies').doc(replyId)
        .set({
            replyUser: currentUser.uid,
            message: reply.value,
            replyId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            replyTo: {
                userId: reply.reply_to.id,
                userName: reply.reply_to.displayName,
            }
        }).then(()=>{
            setShowReply(false)
            setReply({value: '', reply_to:{id: commentUser?.uid,  displayName: commentUser?.displayName}})
            console.log('success !!!')
        }).catch((error)=>{
            return error
        })
       
    }


    /* fetch replies*/


    useEffect(() => {
        let fetchRelies
        if (props.postId) {
            fetchRelies = db.collection('posts').doc(props.postId).collection('comments').doc(props.commentId).collection('replies').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setReplies(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
            })
        }
        return () => {
            fetchRelies()
        }
    },[ props.commentId, props.postId])
    return props.comment && (
        <Style.PaddingSides>
            <Wrapper>
                <Avatar user={props.comment && true} src={commentUser?.photoURL} size="32" hover />
                <CommentContainer>
                    <CommentBox>
                        <Flex align="center">
                            <Typography link as={Link} font="sub" weight="600" Color="primary" to={`/profile/${commentUser?.uid}`} text={commentUser?.displayName}/>
                            {commentUser?.verified ? <Icon style={{transform:'scale(.7)', display:'flex', alignItems:'center', justifyContent:'center'}} src="2" size="16" name="verified" aria-label="Verified Account" />: ''}
                        </Flex>
                        <Typography weight="normal" font="small" Color="primary" text={props.comment}/>
                    </CommentBox>
                    <UnderBox>
                        <ul> 
                            <li>
                                <Typography link as="span"  font="sub" Color="secondary" weight="bold" text="Like"/> 
                            </li>
                                <span className="dot">.</span>
                            <li role="button" tabIndex="0" onClick={handleShowInput} >
                                <Typography link as="span" font="sub" Color="secondary" weight="bold" text="Reply"/>
                            </li>
                                <span className="dot">.</span>
                            <li>
                                <Typography link as="span" Color="secondary" weight="normal" text={ new Date(props.timestamp?.toDate()).toDateString()} font="sub"/>
                            </li>
                        </ul>
                    </UnderBox>
                    {replies && replies.length > 2 &&
                        <Style.PaddingSides>
                            <Wrapper>
                                <Typography as="span" link text={limitMap.limited ? `view ${replies.length} more replies`: `view less replies`} Color="secondary" onClick={limitMap.limited ? expandComments : narrowComments} />
                            </Wrapper>
                        </Style.PaddingSides>
                    }
                    {replies.slice(0, limitMap.value).map((rep)=>{
                        return(
                            <Replies 
                                key={rep.data.replyId}
                                repUid={rep.data.replyTo.userId}
                                displayName={rep.data.replyTo.userName}
                                userName={rep.data.displayName}
                                userId={rep.data.userId}
                                message={rep.data.message}
                                timestamp={rep.data.timestamp}
                                replyUser={rep.data.replyUser}
                            />
                        )
                    })}
                    {showReply && 
                        <ReplyInput 
                            placeholder={`Reply to ${!reply.reply_to.uid === currentUser.id ? reply.reply_to.displayName: `myself`}`} 
                            aria-label={`Reply to ${!reply.reply_to.uid === currentUser.id ? reply.reply_to.displayName: `myself`}`} 
                            reply value={reply.value}  
                            onSubmit={handleReply} 
                            handleOnChange={handleReplyChange} 
                        />
                    }
                </CommentContainer>
            </Wrapper>
        </Style.PaddingSides>
    )
}

const Replies=props=>{
    const [rUser, setRUser]=useState(null)
    useEffect(()=>{
        const fetchReplyUser = db.collection('users').doc(props.replyUser).onSnapshot((doc)=>{
            setRUser(doc.data())
        })
        return ()=> { fetchReplyUser()} 
    }, [props.replyUser])

    const [showReply, setShowReply] = useState(false)

    const handleShowInput = e =>{
        e.preventDefault()
        setShowReply((showReply)=> !showReply)
    }
    return(
        <Wrapper>
                <Avatar user={rUser} src={rUser?.photoURL} size="32" hover />
                 <CommentContainer>
                    <CommentBox>
                        <Flex align="center">

                            <Typography link as={Link} font="sub" weight="600" Color="primary" to={`/profile/:uid/${rUser?.uid}`} text={rUser?.displayName} />
                            {rUser?.verified ? <Icon style={{transform:'scale(.7)', display:'flex', alignItems:'center', justifyContent:'center'}} src="2" size="16" name="verified" aria-label="Verified Account" />: ''}
                        </Flex>
                        
                        <div className="reply-flex" dir="auto" aria-label={`${rUser?.displayName} replied to ${rUser?.uid === props.repUid ? `himself`: `${props.displayName}`}` }>
                            <Typography  link as={Link} weight="600" font="small" Color="primary" text={rUser?.uid === props.repUid ? '' : props.displayName}/>
                            <Typography weight="normal" font="small" Color="primary" text={props.message}/>
                        </div>
                    </CommentBox>
                    <UnderBox>
                        <ul> 
                            <li>
                                <Typography link as="span"  font="sub" Color="secondary" weight="bold" text="Like"/> 
                            </li>
                                <span className="dot">.</span>
                            <li role="button" tabIndex="0" onClick={handleShowInput}>
                                <Typography link as="span" font="sub" Color="secondary" weight="bold" text="Reply"/>
                            </li>
                                <span className="dot">.</span>
                            <li>
                                <Typography link as="span" Color="secondary" weight="normal" text={ new Date(props.timestamp?.toDate()).toDateString()} font="sub"/>
                            </li>
                        </ul>
                    </UnderBox>
                    {showReply && 
                        <ReplyInput 
                            placeholder={`Reply to ${rUser.displayName}`}
                            ariaLabel={`Reply to ${rUser.displayName}`}
                            reply   
                            onSubmit={undefined} 
                            handleOnChange={undefined} 
                        />
                    }
                </CommentContainer>
            </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-top:4px;
    padding-bottom:4px;
    display:flex;
`
const CommentContainer = styled.div`
    width:100%;
    position:relative;
    margin-left:6px;
    max-width: calc(100% - 26px);
`
const CommentBox = styled.div`
    background: var(--input-bg);
    border-radius:18px;
    width:fit-content;
    max-width:100%;
    padding: 6px 12px;
    & > .reply-flex{
        display:flex;
        & > :first-child{
            margin-right:3px;
        }
    }
`
const UnderBox = styled.div`
    margin-left:  12px;
    padding-top:3px;
    & > ul{
        display:flex;
        align-items:baseline;
        & > li{
            display:flex;
        }
        & > .dot{
            display:flex;
            color:var(--secondary-text);
            display: flex;
   
            align-self: flex-start;
            height: fit-content;
            font-size: 10.4px;
            margin: 0px 5px;
        }
    }

`