import React from 'react'
import styled from 'styled-components'
import Icon from './Icons'
export function Verified({ verified }) {
    return !!verified?(

        <Container>
            <span>
                <Icon src="2" size="16" name="verified" aria-label="Verified Account" />
            </span>
        </Container>
    ): null
}

const Container= styled.span`
    padding-left:4px;
`