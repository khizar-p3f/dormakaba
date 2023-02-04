import React, { Component } from 'react'
import { ErrorBoundary } from 'react-error-boundary'


const flexContainer={
    "display": "flex",
   " flex-direction": "row",
    "flex-wrap": "nowrap",
    "justify-content": "center",
   " align-items":" flex-start",
    "align-content": "flex-start",
    "margin-top":"100px"
}

const flexItems={
    "display": "block",
    "flex-grow": 0,
    "flex-shrink": 1,
    "flex-basis": "auto",
    "align-self": "auto",
    "order": 0,
    "padding": "56px",
    "border-radius": "10px",
    "box-shadow":"0 0 3px 1px #ccc"
}
const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div className="flex-container" style={flexContainer}>
            <div className="flex-items" style={flexItems}>
                <h2>Something went wrong:</h2>
                <pre>{error.message}</pre>
                <pre>{error.stack}</pre> 
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        </div>

    )
}

const DefaultErrorBoundary = (props) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            {props.children}
        </ErrorBoundary>
    )
}
export default DefaultErrorBoundary