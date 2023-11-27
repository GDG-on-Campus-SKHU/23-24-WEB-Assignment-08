import './Topbar.css';
import pokeball from '../images/pokeball.png';
import pokeball_black from '../images/pokeball_black.png';

function Topbar() {

  return (
    <div className='title'>
      <div className="title_left">
        <p>Pokédex</p>
        <div className="caught-seen">
          <div className="caught">
            <img src={pokeball} alt="pokeball" className='pokeball' />
            <p>438</p>
          </div>
          <div className="seen">
            <img src={pokeball_black} alt="pokeball_black" className='pokeball' />
            <p>649</p>
          </div>
        </div>
      </div>
      <p id='namebar'>A -&gt; Z</p>
    </div>
  )
}

export default Topbar
