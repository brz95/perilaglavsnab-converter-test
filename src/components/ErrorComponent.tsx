interface IErrorComponent {
  error: string | null
}

const ErrorComponent = ({ error }: IErrorComponent): JSX.Element | null => {
  return error ? <div className="error">Произошла ошибка. {error}</div> : null
}

export default ErrorComponent
