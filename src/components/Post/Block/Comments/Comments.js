import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Style from '../../Styles';
import db from '../../../../config/Firebase';
import firebase from 'firebase';
import { useAuth } from '../../../Context'
import { v4 as uuidv4 } from 'uuid';
import Typography from '../../../Typography';
import SingleComments from './SingleComment';
import Create from './CreateComment';


export default function Comments(props) {
    const { currentUser } = useAuth()
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState(null)
    const [limitMap, setLimitMap]= useState({value: 2, limited: true})
   
    const onChangeComment = e => {
        const value = e.target.value
        if (value) {
            setComment(value)
        }
        console.log(comment)
    }
    const handleSubmitComment = e => {
        e.preventDefault()
        if(!comment) return ;
        const commentId= uuidv4();
        db.collection('posts').doc(props.postId).collection('comments').doc(commentId)
        .set({
            commentUser: currentUser.uid,
            comment,
            commentId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()       
        })
        .then(()=>{
            setComment(null)
        })
        .catch((error)=>{
            throw Error('we could not create your comment', 'error', error )
            
        })
    }
    useEffect(() => {
        let fetchComments
        if (props.postId) {
            fetchComments = db.collection('posts').doc(props.postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
            })
        }
        return () => {
            fetchComments()
        }
    },[ props.postId])
    const expandComments = e =>{
        e.preventDefault()
        setLimitMap({value: comments.length, limited: false})
    }
    const narrowComments =e=>{
        e.preventDefault()
        setLimitMap({value: 2, limited:true})
    }
    return (
        <Style.Container>
            {comments.length > 2 &&
            <Style.PaddingSides>
                <Wrapper>
                    <Typography as="span" link text={limitMap.limited ? `view ${comments.length} more comments`: `view less comments`} Color="secondary" onClick={limitMap.limited ? expandComments : narrowComments} />
                </Wrapper>
            </Style.PaddingSides>
            }
            {comments.slice(0, limitMap.value).map((comment)=>(
                <SingleComments 
                    key={comment.data.commentId} 
                    comment={comment.data.comment} 
                    user={comment.data.commentUser}
                    setLimitMap={setLimitMap}
                    timestamp={comment.data.timestamp}
                    postId={props.postId}
                    commentId={comment.data.commentId}
                />
            ))}
            <Create 
                onSubmit={handleSubmitComment} 
                handleOnChange={onChangeComment}
                reply={false}
            />
        </Style.Container>
    )
}



const Wrapper = styled.div`
    padding-top:4px;
    padding-bottom:4px;
    display:flex;
    margin-bottom: 5px;

`
