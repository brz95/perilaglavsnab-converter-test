interface ILoader {
  loaderActive: boolean
}

const Loader = ({ loaderActive }: ILoader): JSX.Element | null => {
  return loaderActive ? <div className="loader"></div> : null
}

export default Loader
