import React from 'react'
import { Link } from 'react-router-dom'
const DashHeader = () => {
  const content = (
    <header className='dash-header'>
<div className='dash-header__container'>
    <Link to="/dash">
        <h1 className='dash-header__title'> Notes on Technology </h1>
    </Link>
    <nav className='dash-header__nav'>
{/*Addition of nav button should take place here*/}
    </nav>
</div>
    </header>
  )
  return content
}

export default DashHeader