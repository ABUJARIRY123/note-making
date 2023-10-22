import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className='public'>
<header>
    <h1>Welcome to <span className='nowrap'> technological solutions </span></h1>
</header>
<main className='public__main'>
<p>We are located at Chidze massive, we provide a wide range of sultions </p>
<address className='public__addr'>
    Ridhiwani Maro <br/>
    1012, Chidze Massive <br/>
    Nairobi, Kenya <br/>
    <a href='tel: +254799690364'>(555) 555-5555 </a>
</address>
<br/>
<p>Owner: Ade Maro</p>
</main>
<footer>
    <Link to="/login">Employee Login</Link>
</footer>
        </section>
    )
    return content
}
export default Public