import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ThankYou() {

  return (
    <div className={'flex flex-col justify-center items-center'}>
      <h2 className={'text-4xl'}><FontAwesomeIcon icon={faMapPin} /></h2> 
      <h3 className={'text-3xl'}>Order Placed</h3>
      <span>You get a notification if the food is arrived</span>
    </div>
  )
}

export default ThankYou
