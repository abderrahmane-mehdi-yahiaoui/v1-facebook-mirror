import React from 'react';
import styled from 'styled-components';
import * as Style from '../../Styles';
import { Avatar } from '../../../Avatar';
import Icon from '../../../Icons';
import { useAuth } from '../../../Context'

function CreateComment(props) {
    const { onSubmit, handleOnChange, reply } = props
    const { currentUser} = useAuth()
    return (
        <Style.PaddingSides>
            <Wrapper>
                <Avatar user={currentUser} src={currentUser.photoURL} size="32" hover />
                <Form htmlFor="comment" onSubmit={onSubmit}>
                    <Input ariaLabel={props.ariaLabel} placeholder={!reply ?  `Write a comment...`:props.placeholder} value={props.value} name="comment" onChange={handleOnChange} />
                    <ListItems>
                        <li><Icon name={`emoji-small`} src={`5`} variante="secondary" size="16" /></li>
                        <li><Icon name={`camera-flat2`} src={`5`} variante="secondary" size="16" /></li>
                    </ListItems>
                </Form>
            </Wrapper>
        </Style.PaddingSides>
    )
}

export default CreateComment

const Wrapper = styled.div`
    padding-top:4px;
    padding-bottom:4px;
    display:flex;
    margin-bottom: 5px;

`
const Form = styled.form`
    width:100%;
    height:100%;
    border-radius:55px;
    background-color:var(--input-bg);
    display:flex;
    flex-wrap:nowrap;
    justify-content:space-between;
    margin-left:6px;
`
const Input = styled.input`
    border-radius:inherit;
    background-color:transparent;
    border-style:none;
    outline:none;
    height:34px;
    color:var(--secondary-text);
    width:100%;
    
`
const ListItems = styled.ul`
    display:flex;
    align-items:center;
    &> li{
        margin: 1px 2px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:55px;
        height:100%;
        width:100%;
        padding:10px;
        height:36px;
        &:hover{
            background-color: var(--hover-overlay)
        }
    }
`
