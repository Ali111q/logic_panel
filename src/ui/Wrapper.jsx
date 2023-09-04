import React from 'react'

const Wrapper = (props) => {
    return (
        <div className="d-flex gap-5 bg-light min-vh-100">
            {props.children}
        </div>
    )
}

export default Wrapper
