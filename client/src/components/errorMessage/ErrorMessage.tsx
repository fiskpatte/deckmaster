import React from 'react'

type ErrorMessageProps = {
    message: string
  }

export const ErrorMessage = ({ message } : ErrorMessageProps) => <h4 style={{color: 'red'}}>{message}</h4>

export default ErrorMessage;