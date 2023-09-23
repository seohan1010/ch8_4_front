import classes from './Navigation.module.css';
import List from '../part/list/List';
import { Link } from 'react-router-dom';


const Navigation =() => {

return(
<>
    <div className={classes.navigation_wrap}>
            <div className={classes.title}><Link to={'/'} className={classes.title_anchior_tag} >ch8_4</Link></div>

            <ul>
          
                 <List className={classes.li_first} href={'/'} content={'home'} />
                 <List className={classes.li_second} href={'/board'} content={'board'} />
                 <List className={classes.li_third} href={'/register'} content={'register'} />

            </ul>

    </div>
</>
);

}


export default Navigation;